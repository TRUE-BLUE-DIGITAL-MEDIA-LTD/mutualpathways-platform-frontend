/**
 * -------------------------------------------------------
 * Tracking Gateway
 * Version : 2.0.0
 * Runtime : Netlify Functions
 *
 * Receives one conversion from Binom
 * Sends to:
 *   - Meta CAPI
 *   - GA4 Measurement Protocol
 *   - Google Ads Upload Click Conversions
 * -------------------------------------------------------
 */

const crypto = require("crypto");

const CONFIG = Object.freeze({
  SERVICE: "Tracking Gateway",
  VERSION: "2.0.0",
  DEBUG: true,

  META_API_VERSION: "v23.0",
  GA4_ENDPOINT: "https://www.google-analytics.com/mp/collect",
  GOOGLE_ADS_API_VERSION: "v20",
});

const ENV = Object.freeze({
  BINOM_SECRET: process.env.BINOM_SECRET,

  META_PIXEL_ID: process.env.META_PIXEL_ID,
  META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
  META_TEST_EVENT_CODE: process.env.META_TEST_EVENT_CODE,

  GA4_MEASUREMENT_ID: process.env.GA4_MEASUREMENT_ID,
  GA4_API_SECRET: process.env.GA4_API_SECRET,

  GOOGLE_ADS_CUSTOMER_ID: process.env.GOOGLE_ADS_CUSTOMER_ID,
  GOOGLE_ADS_REG_ACTION: process.env.GOOGLE_ADS_REG_ACTION,
  GOOGLE_ADS_SALE_ACTION: process.env.GOOGLE_ADS_SALE_ACTION,
  GOOGLE_ADS_EU_ACTION: process.env.GOOGLE_ADS_EU_ACTION,
  GOOGLE_ADS_SALE2_ACTION: process.env.GOOGLE_ADS_SALE2_ACTION,
  GOOGLE_ADS_SALE3_ACTION: process.env.GOOGLE_ADS_SALE3_ACTION,
  GOOGLE_ADS_DEVELOPER_TOKEN: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  GOOGLE_ADS_CLIENT_ID: process.env.GOOGLE_ADS_CLIENT_ID,
  GOOGLE_ADS_CLIENT_SECRET: process.env.GOOGLE_ADS_CLIENT_SECRET,
  GOOGLE_ADS_REFRESH_TOKEN: process.env.GOOGLE_ADS_REFRESH_TOKEN,
});

const EVENT_MAP = {
  reg: {
    meta: "CompleteRegistration",
    ga4: "sign_up",
  },

  sale: {
    meta: "Purchase",
    ga4: "purchase",
  },

  eu: {
    meta: "InitiateCheckout",
    ga4: "engaged_user",
  },

  sale2: {
    meta: "Purchase2",
    ga4: "second_purchase",
  },

  sale3: {
    meta: "AddToCart",
    ga4: "third_purchase",
  },
};

const REQUIRED_PARAMS = [
  "secret",
  "event",
  "clickid",
  "client_id",
  "land",
  "acc",
  "site",
  "ts",
];

class GatewayError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "GatewayError";
    this.status = status;
  }
}

function formatGoogleDateTime(date = new Date()) {
  return date
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, "+00:00");
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function log(requestId, stage, data = null) {
  if (!CONFIG.DEBUG) return;

  console.log(`[${requestId}] ${stage}`);

  if (data !== null) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function sha256(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function getParams(event) {
  if (event.httpMethod === "POST") {
    return JSON.parse(event.body || "{}");
  }

  return event.queryStringParameters || {};
}

function validateParams(params) {
  const missing = REQUIRED_PARAMS.filter((key) => !params[key]);

  if (missing.length) {
    throw new GatewayError(400, `Missing parameter(s): ${missing.join(", ")}`);
  }

  if (params.secret !== ENV.BINOM_SECRET) {
    throw new GatewayError(401, "Unauthorized");
  }

  const advertiserEvent = String(params.event).trim().toLowerCase();

  const events = EVENT_MAP[advertiserEvent];

  if (!events) {
    throw new GatewayError(400, `Unsupported event '${params.event}'`);
  }

  return {
    advertiserEvent,
    events,
  };
}

function buildContext(event) {
  const requestId = crypto.randomUUID();

  const params = getParams(event);

  const { advertiserEvent, events } = validateParams(params);

  const ip =
    event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
    event.headers?.["client-ip"] ||
    "";

  const ua = event.headers?.["user-agent"] || "";

  const timestamp = Math.floor(Date.now() / 1000);

  const eventId = sha256(`${params.site}|${params.clickid}|${advertiserEvent}`);

  const clientId = params.client_id;

  return {
    requestId,

    receivedAt: Date.now(),

    timestamp,

    conversionDateTime: formatGoogleDateTime(),

    ip,
    ua,

    advertiserEvent,
    events,

    clickid: params.clickid,

    fbclid: params.fbclid || null,

    gclid: params.gclid || null,

    fbc: params.fbclid ? `fb.1.${timestamp}.${params.fbclid}` : null,

    land: params.land,
    acc: params.acc,
    site: params.site,
    ts: params.ts,

    eventId,
    clientId,
  };
}

async function sendMeta(ctx) {
  if (!ENV.META_PIXEL_ID || !ENV.META_ACCESS_TOKEN) {
    return {
      platform: "meta",
      success: false,
      skipped: true,
      reason: "Meta is not configured.",
    };
  }

  if (!ctx.fbclid) {
    return {
      platform: "meta",
      success: false,
      skipped: true,
      reason: "Missing fbclid.",
    };
  }

  const payload = {
    data: [
      {
        event_name: ctx.events.meta,

        event_time: ctx.timestamp,

        event_id: ctx.eventId,

        action_source: "website",

        user_data: {
          client_ip_address: ctx.ip,

          client_user_agent: ctx.ua,

          fbc: ctx.fbc,
        },

        custom_data: {
          land: ctx.land,

          acc: ctx.acc,

          site: ctx.site,

          ts: ctx.ts,
        },
      },
    ],
  };

  if (ENV.META_TEST_EVENT_CODE) {
    payload.test_event_code = ENV.META_TEST_EVENT_CODE;
  }

  log(ctx.requestId, "META_REQUEST", payload);

  const response = await fetch(
    `https://graph.facebook.com/${CONFIG.META_API_VERSION}/${ENV.META_PIXEL_ID}/events`,

    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${ENV.META_ACCESS_TOKEN}`,

        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    },
  );

  let body;

  try {
    body = await response.json();
  } catch {
    body = await response.text();
  }

  log(ctx.requestId, "META_RESPONSE", body);

  return {
    platform: "meta",

    success: response.ok,

    status: response.status,

    payload,

    response: body,
  };
}

async function sendGA4(ctx) {
  if (!ENV.GA4_MEASUREMENT_ID || !ENV.GA4_API_SECRET) {
    return {
      platform: "ga4",
      success: false,
      skipped: true,
      reason: "GA4 is not configured.",
    };
  }

  const payload = {
    client_id: ctx.clientId,

    events: [
      {
        name: ctx.events.ga4,

        params: {
          event_id: ctx.eventId,

          engagement_time_msec: 1,

          land: ctx.land,

          acc: ctx.acc,

          site: ctx.site,

          ts: ctx.ts,

          clickid: ctx.clickid,
        },
      },
    ],
  };

  if (ctx.fbclid) {
    payload.events[0].params.fbclid = ctx.fbclid;
  }

  if (ctx.gclid) {
    payload.events[0].params.gclid = ctx.gclid;
  }

  log(ctx.requestId, "GA4_REQUEST", payload);

  const url =
    `${CONFIG.GA4_ENDPOINT}` +
    `?measurement_id=${encodeURIComponent(ENV.GA4_MEASUREMENT_ID)}` +
    `&api_secret=${encodeURIComponent(ENV.GA4_API_SECRET)}`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  let body = "";

  try {
    body = await response.text();
  } catch {
    body = "";
  }

  log(ctx.requestId, "GA4_RESPONSE", body || "(empty)");

  return {
    platform: "ga4",

    success: response.ok,

    status: response.status,

    payload,

    response: body,
  };
}

let googleAccessToken = null;
let googleAccessTokenExpires = 0;

async function getGoogleAccessToken() {
  if (googleAccessToken && Date.now() < googleAccessTokenExpires) {
    return googleAccessToken;
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: ENV.GOOGLE_ADS_CLIENT_ID,
      client_secret: ENV.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: ENV.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(`Google OAuth failed: ${JSON.stringify(body)}`);
  }

  googleAccessToken = body.access_token;

  googleAccessTokenExpires = Date.now() + (body.expires_in - 60) * 1000;

  return googleAccessToken;
}

const GOOGLE_ACTION_MAP = {
  reg: ENV.GOOGLE_ADS_REG_ACTION,
  sale: ENV.GOOGLE_ADS_SALE_ACTION,
  eu: ENV.GOOGLE_ADS_EU_ACTION,
  sale2: ENV.GOOGLE_ADS_SALE2_ACTION,
  sale3: ENV.GOOGLE_ADS_SALE3_ACTION,
};

async function sendGoogleAds(ctx) {
  if (
    !ENV.GOOGLE_ADS_CUSTOMER_ID ||
    !GOOGLE_ACTION_MAP[ctx.advertiserEvent] ||
    !ENV.GOOGLE_ADS_DEVELOPER_TOKEN ||
    !ENV.GOOGLE_ADS_CLIENT_ID ||
    !ENV.GOOGLE_ADS_CLIENT_SECRET ||
    !ENV.GOOGLE_ADS_REFRESH_TOKEN
  ) {
    return {
      platform: "google",
      success: false,
      skipped: true,
      reason: "Google Ads is not configured.",
    };
  }

  if (!ctx.gclid) {
    return {
      platform: "google",
      success: false,
      skipped: true,
      reason: "Missing gclid.",
    };
  }

  const accessToken = await getGoogleAccessToken();

  const conversionAction = `customers/${ENV.GOOGLE_ADS_CUSTOMER_ID}/conversionActions/${GOOGLE_ACTION_MAP[ctx.advertiserEvent]}`;

  const payload = {
    conversions: [
      {
        conversionAction,

        gclid: ctx.gclid,

        conversionDateTime: ctx.conversionDateTime,
      },
    ],

    partialFailure: true,

    validateOnly: false,
  };

  log(ctx.requestId, "GOOGLE_REQUEST", payload);

  const response = await fetch(
    `https://googleads.googleapis.com/${CONFIG.GOOGLE_ADS_API_VERSION}` +
      `/customers/${ENV.GOOGLE_ADS_CUSTOMER_ID}:uploadClickConversions`,

    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${accessToken}`,

        "developer-token": ENV.GOOGLE_ADS_DEVELOPER_TOKEN,

        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    },
  );

  let body;

  try {
    body = await response.json();
  } catch {
    body = await response.text();
  }

  log(ctx.requestId, "GOOGLE_RESPONSE", body);

  const partialFailure = body?.partialFailureError;

  if (partialFailure) {
    console.error(
      `[${ctx.requestId}] Google Ads partial failure`,
      partialFailure,
    );
  }

  return {
    platform: "google",

    success: response.ok && !partialFailure,

    status: response.status,

    payload,

    response: body,
  };
}

exports.handler = async (event) => {
  try {
    const ctx = buildContext(event);

    log(ctx.requestId, "REQUEST", ctx);

    const settled = await Promise.allSettled([
      sendMeta(ctx),

      sendGA4(ctx),

      sendGoogleAds(ctx),
    ]);

    const results = settled.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        success: false,
        error: result.reason?.message || "Unknown error",
      };
    });

    const response = {
      requestId: ctx.requestId,

      success: true,

      results: {
        meta: results[0],

        ga4: results[1],

        google: results[2],
      },
    };

    log(ctx.requestId, "COMPLETE", response);

    return jsonResponse(200, response);
  } catch (error) {
    const status = error instanceof GatewayError ? error.status : 500;

    const body = {
      success: false,

      error: error.message,
    };

    console.error(error);

    return jsonResponse(status, body);
  }
};
