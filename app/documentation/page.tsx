import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type NavItem = {
  id: string;
  label: string;
  children?: NavItem[];
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const sidebarGroups: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { id: "get-an-api-key", label: "Get an API key" },
      { id: "installation", label: "Installation" },
      { id: "authentication", label: "Authentication" },
      { id: "sdk-quickstart", label: "SDK quickstart" },
      { id: "sdk-configuration", label: "SDK configuration" },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        id: "payments",
        label: "Payments",
        children: [
          { id: "create-a-payment", label: "Create a payment" },
          { id: "verify-a-payment", label: "Verify a payment" },
          { id: "list-payments", label: "List payments" },
        ],
      },
      { id: "payment-object", label: "Payment object" },
      { id: "payment-lifecycle", label: "Payment lifecycle" },
    ],
  },
  {
    title: "Webhooks",
    items: [
      {
        id: "webhooks",
        label: "Webhooks",
        children: [
          { id: "webhook-events", label: "Events" },
          { id: "webhook-payload", label: "Payload" },
          { id: "verifying-signatures", label: "Verifying signatures" },
        ],
      },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "error-handling", label: "Error handling" },
      { id: "supported-currencies", label: "Supported currencies" },
      { id: "environment-variables", label: "Environment variables" },
    ],
  },
];

const onThisPage = [
  { id: "get-an-api-key", label: "Get an API key" },
  { id: "sdk-quickstart", label: "SDK quickstart" },
  { id: "payments", label: "Payments" },
  { id: "payment-lifecycle", label: "Payment lifecycle" },
  { id: "webhooks", label: "Webhooks" },
  { id: "error-handling", label: "Error handling" },
  { id: "environment-variables", label: "Environment variables" },
];

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Clink SDK documentation for accepting USDC on Stellar and receiving local currency payouts.",
};

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-border bg-tertiary px-1.5 py-0.5 text-[0.95em] text-primary">
      {children}
    </code>
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-primary">
      <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/60">
        {language ?? "Code"}
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-7 text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm text-black/78">
          <thead className="bg-primary">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-border px-4 py-3 font-medium text-white!"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="align-top">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="border-b border-border px-4 py-3 last:border-b-0"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <h2 className="text-3xl tracking-[-0.05em] text-black">{title}</h2>
      <div className="mt-5 space-y-5 text-base leading-8 text-black/78">
        {children}
      </div>
    </section>
  );
}

function SidebarItem({
  item,
  nested = false,
}: {
  item: NavItem;
  nested?: boolean;
}) {
  return (
    <div>
      <a
        href={`#${item.id}`}
        className={`block rounded-xl px-3 py-2 text-sm transition hover:bg-surface hover:text-tetiary ${
          nested ? "text-black/50" : "text-black/78"
        }`}
      >
        {item.label}
      </a>
      {item.children ? (
        <div className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
          {item.children.map((child) => (
            <SidebarItem key={child.id} item={child} nested />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function DocumentationPage() {
  return (
    <main className="bg-background text-primary">
      <header className="sticky top-0 z-30 border-b border-border bg-tertiary/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-360 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">
              <Image
                src="/assets/logo.svg"
                alt="Clink"
                width={90}
                height={36}
                priority
              />
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-black/58 md:flex">
              <Link href="/start" className="transition hover:text-black">
                Get Started
              </Link>
              <Link
                href="/documentation"
                className="text-black/58 transition hover:text-black"
              >
                Documentation
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/start"
              className="rounded-xl border border-brand/10 bg-brand px-4 py-2 text-sm text-white! transition hover:opacity-95"
            >
              Get API key
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-360 gap-0 lg:grid-cols-[260px_minmax(0,1fr)_240px]">
        <aside className="hidden border-r border-border lg:block">
          <div className="sticky top-18.25 h-[calc(100vh-73px)] overflow-y-auto px-5 py-6">
            <div className="space-y-7">
              {sidebarGroups.map((group) => (
                <section key={group.title}>
                  <h2 className="mb-3 px-3 text-sm font-medium text-black">
                    {group.title}
                  </h2>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <SidebarItem key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </aside>

        <article className="min-w-0 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <div className="pb-8">
              <p className="text-sm uppercase tracking-[0.18em] text-primary/42">
                Documentation
              </p>
              <h1 className="mt-5 text-4xl tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Clink SDK Documentation
              </h1>
              <p className="mt-5 text-sm text-black/45">
                Last updated April 8, 2026
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/78">
                This guide is focused on developers integrating{" "}
                <strong className="text-primary">clink-sdk</strong>. It keeps
                the docs centered on what your customers need to ship payments,
                and leaves out internal operator details that only Clink needs
                to manage behind the scenes.
              </p>
            </div>

            <div className="mt-8 space-y-10">
              <Section id="get-an-api-key" title="Get an API key">
                <p>
                  Before you can start testing the SDK, request your API key
                  from Clink.
                </p>
                <Link
                  href="/start"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand/10 bg-brand px-5 py-3 text-sm text-white! transition hover:opacity-95"
                >
                  Apply for an API key
                </Link>
              </Section>

              <Section id="installation" title="Installation">
                <CodeBlock language="bash" code={`npm install clink-sdk`} />
                <p>
                  <strong className="text-primary">Requirements:</strong>{" "}
                  Node.js &gt;= 24
                </p>
              </Section>

              <Section id="authentication" title="Authentication">
                <p>All SDK requests require your API key.</p>
                <p>
                  Pass it as <InlineCode>secretKey</InlineCode> in the
                  constructor.
                </p>
              </Section>

              <Section id="sdk-quickstart" title="SDK quickstart">
                <CodeBlock
                  language="ts"
                  code={`import Clink from 'clink-sdk';

const clink = new Clink({
  secretKey: process.env.CLINK_SECRET_KEY,
  webhookSecret: process.env.CLINK_WEBHOOK_SECRET,
});

// Create a payment
const payment = await clink.payments.create({
  amount: 10,
  currency: 'USDC',
  localCurrency: 'NGN',
  callbackUrl: 'https://yourapp.com/webhooks/clink',
  customerEmail: 'buyer@example.com',
  metadata: { orderId: 'order_123' },
});

// Show payment.stellarAddress and payment.memo to the customer

// Verify after the customer sends USDC
const updated = await clink.payments.verify(payment.id);
console.log(updated.status); // 'settled'`}
                />
              </Section>

              <Section id="sdk-configuration" title="SDK configuration">
                <Table
                  headers={[
                    "Option",
                    "Type",
                    "Required",
                    "Default",
                    "Description",
                  ]}
                  rows={[
                    ["secretKey", "string", "Yes", "-", "Your Clink API key"],
                    [
                      "webhookSecret",
                      "string",
                      "No",
                      "secretKey",
                      "Secret used to verify webhook payloads",
                    ],
                    [
                      "environment",
                      "'testnet' | 'mainnet'",
                      "No",
                      "-",
                      "Select the Clink environment to work against",
                    ],
                  ]}
                />
              </Section>

              <Section id="payments" title="Payments">
                <p>
                  Use the payments API to create payment instructions, verify
                  incoming transfers, and inspect payment history from your app.
                </p>
              </Section>

              <Section id="create-a-payment" title="Create a payment">
                <p>
                  Creates a new pending payment and returns the Stellar address
                  and memo to show your customer.
                </p>
                <div>
                  <p className="mb-3 font-medium text-primary">SDK:</p>
                  <CodeBlock
                    language="ts"
                    code={`const payment = await clink.payments.create({
  amount: 10,
  currency: 'USDC',
  localCurrency: 'NGN',
  callbackUrl: 'https://yourapp.com/webhooks/clink',
  description: 'Pro plan subscription',
  customerEmail: 'buyer@example.com',
  metadata: { orderId: 'order_123' },
});`}
                  />
                </div>
                <div>
                  <p className="mb-3 font-medium text-primary">Parameters:</p>
                  <Table
                    headers={["Field", "Type", "Required", "Description"]}
                    rows={[
                      ["amount", "number", "Yes", "Amount in USDC"],
                      ["currency", "'USDC'", "Yes", "Must be 'USDC'"],
                      [
                        "localCurrency",
                        "string",
                        "Yes",
                        "Payout currency - NGN, GHS, KES, or UGX",
                      ],
                      [
                        "callbackUrl",
                        "string",
                        "Yes",
                        "HTTPS URL Clink will POST webhook events to",
                      ],
                      ["description", "string", "No", "Payment description"],
                      [
                        "customerEmail",
                        "string",
                        "No",
                        "Customer email address",
                      ],
                      [
                        "metadata",
                        "object",
                        "No",
                        "Arbitrary key-value data returned in webhooks",
                      ],
                    ]}
                  />
                </div>
                <p>
                  <strong className="text-primary">Response:</strong>{" "}
                  <a
                    href="#payment-object"
                    className="underline underline-offset-4"
                  >
                    Payment object
                  </a>
                </p>
              </Section>

              <Section id="verify-a-payment" title="Verify a payment">
                <p>
                  Checks Stellar for an incoming USDC transaction matching the
                  payment. If found, triggers settlement and returns the updated
                  payment.
                </p>
                <CodeBlock
                  language="ts"
                  code={`const payment = await clink.payments.verify('pay_abc123');`}
                />
                <p>
                  <strong className="text-primary">Response:</strong>{" "}
                  <a
                    href="#payment-object"
                    className="underline underline-offset-4"
                  >
                    Payment object
                  </a>
                </p>
              </Section>

              <Section id="list-payments" title="List payments">
                <CodeBlock
                  language="ts"
                  code={`// All payments
const payments = await clink.payments.list();

// With filters
const payments = await clink.payments.list({
  status: 'pending',
  limit: 20,
});`}
                />
                <div>
                  <p className="mb-3 font-medium text-primary">
                    Query parameters:
                  </p>
                  <Table
                    headers={["Parameter", "Type", "Description"]}
                    rows={[
                      [
                        "status",
                        "string",
                        "Filter by status: pending, confirmed, settled, expired, failed",
                      ],
                      [
                        "limit",
                        "number",
                        "Max results to return (default: 20)",
                      ],
                    ]}
                  />
                </div>
                <p>
                  <strong className="text-primary">Response:</strong> Array of{" "}
                  <a
                    href="#payment-object"
                    className="underline underline-offset-4"
                  >
                    Payment objects
                  </a>
                </p>
              </Section>

              <Section id="payment-object" title="Payment object">
                <CodeBlock
                  language="json"
                  code={`{
  "id": "pay_a1b2c3d4e5f6g7h8i9",
  "stellarAddress": "GCEUHLTXIODT3XXIKZZKHZWX5A2H54BGKGKZPWRZZEZBHOK26C7OEEWR",
  "memo": "clink-pay_a1b2c3d4e5f6g7h8i9",
  "amount": 10,
  "currency": "USDC",
  "localCurrency": "NGN",
  "localAmount": 16000,
  "status": "settled",
  "description": "Pro plan subscription",
  "customerEmail": "buyer@example.com",
  "stellarTxHash": "abc123...",
  "metadata": { "orderId": "order_123" },
  "expiresAt": "2025-01-01T00:30:00.000Z",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "settledAt": "2025-01-01T00:05:00.000Z"
}`}
                />
                <div>
                  <p className="mb-3 font-medium text-primary">Fields:</p>
                  <Table
                    headers={["Field", "Type", "Description"]}
                    rows={[
                      ["id", "string", "Unique payment ID"],
                      [
                        "stellarAddress",
                        "string",
                        "Stellar address the customer sends USDC to",
                      ],
                      [
                        "memo",
                        "string",
                        "Memo the customer must include with their transaction",
                      ],
                      ["amount", "number", "USDC amount"],
                      ["currency", "string", "Always USDC"],
                      ["localCurrency", "string", "Payout currency"],
                      [
                        "localAmount",
                        "number",
                        "Settled local currency amount (present after settlement)",
                      ],
                      ["status", "string", "Current payment status"],
                      [
                        "stellarTxHash",
                        "string",
                        "Stellar transaction hash (present after confirmation)",
                      ],
                      ["metadata", "object", "Your custom metadata"],
                      ["expiresAt", "string", "ISO 8601 expiry time"],
                      ["createdAt", "string", "ISO 8601 creation time"],
                      [
                        "settledAt",
                        "string",
                        "ISO 8601 settlement time (present after settlement)",
                      ],
                    ]}
                  />
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-sm leading-7 text-primary/78">
                    <strong className="text-primary">Important:</strong> Always
                    instruct your customer to include the{" "}
                    <InlineCode>memo</InlineCode> exactly when sending USDC.
                    Without the memo, Clink cannot match the transaction to the
                    payment.
                  </p>
                </div>
              </Section>

              <Section id="payment-lifecycle" title="Payment lifecycle">
                <CodeBlock
                  language="flow"
                  code={`pending --> confirmed --> settled
   |
   +--> expired
   |
   +--> failed`}
                />
                <Table
                  headers={["Status", "Description"]}
                  rows={[
                    ["pending", "Payment created, waiting for USDC on Stellar"],
                    [
                      "confirmed",
                      "USDC received on Stellar, settlement in progress",
                    ],
                    ["settled", "Local currency payout complete"],
                    ["expired", "USDC not received before the payment expires"],
                    ["failed", "Settlement failed after USDC was received"],
                  ]}
                />
              </Section>

              <Section id="webhooks" title="Webhooks">
                <p>
                  Clink sends a signed <InlineCode>POST</InlineCode> request to
                  your <InlineCode>callbackUrl</InlineCode> whenever a payment
                  status changes.
                </p>
              </Section>

              <Section id="webhook-events" title="Webhook events">
                <Table
                  headers={["Event", "Fired when"]}
                  rows={[
                    ["payment.confirmed", "USDC arrives on Stellar"],
                    ["payment.settled", "Local currency payout is complete"],
                    ["payment.failed", "Settlement fails"],
                    [
                      "payment.expired",
                      "Payment expires without receiving USDC",
                    ],
                  ]}
                />
              </Section>

              <Section id="webhook-payload" title="Webhook payload">
                <CodeBlock
                  language="json"
                  code={`{
  "event": "payment.settled",
  "data": {
    "id": "pay_a1b2c3d4e5f6g7h8i9",
    "status": "settled",
    "localAmount": 16000,
    "metadata": { "orderId": "order_123" }
  },
  "signature": "a3f9c1e2b4d8..."
}`}
                />
                <p>
                  The signature is also sent as the{" "}
                  <InlineCode>x-clink-signature</InlineCode> request header.
                </p>
              </Section>

              <Section id="verifying-signatures" title="Verifying signatures">
                <p>
                  Always verify the signature before processing a webhook.
                  Ignore any webhook with an invalid signature.
                </p>
                <CodeBlock
                  language="ts"
                  code={`app.post('/webhooks/clink', express.json(), async (req, res) => {
  const valid = clink.webhooks.verify({
    payload: req.body,
    signature: req.headers['x-clink-signature'] as string,
    secret: process.env.CLINK_WEBHOOK_SECRET,
  });

  if (!valid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { event, data } = req.body;

  switch (event) {
    case 'payment.settled':
      await fulfillOrder(data.metadata.orderId);
      break;
    case 'payment.expired':
      break;
    case 'payment.failed':
      break;
  }

  res.json({ received: true });
});`}
                />
                <p>
                  <strong className="text-primary">Webhook response:</strong>{" "}
                  Always return <InlineCode>200</InlineCode> quickly. Clink
                  retries failed deliveries up to 3 times.
                </p>
              </Section>

              <Section id="error-handling" title="Error handling">
                <p>All SDK errors follow this shape:</p>
                <CodeBlock
                  language="json"
                  code={`{
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "details": {}
}`}
                />
                <div>
                  <p className="mb-3 font-medium text-primary">Common codes:</p>
                  <Table
                    headers={["Code", "HTTP status", "Description"]}
                    rows={[
                      ["INVALID_API_KEY", "401", "Missing or invalid API key"],
                      [
                        "INVALID_PAYMENT_REQUEST",
                        "400",
                        "Invalid payment parameters or duplicate email",
                      ],
                      [
                        "INVALID_CONFIGURATION",
                        "400",
                        "Invalid SDK configuration",
                      ],
                      ["PAYMENT_NOT_FOUND", "404", "Payment ID does not exist"],
                      ["PAYMENT_EXPIRED", "410", "Payment has expired"],
                      [
                        "INVALID_SIGNATURE",
                        "401",
                        "Webhook signature verification failed",
                      ],
                    ]}
                  />
                </div>
                <div>
                  <p className="mb-3 font-medium text-primary">
                    SDK error handling:
                  </p>
                  <CodeBlock
                    language="ts"
                    code={`import Clink, { ClinkError } from 'clink-sdk';

try {
  const payment = await clink.payments.create({ ... });
} catch (error) {
  if (error instanceof ClinkError) {
    console.error(error.code);
    console.error(error.message);
    console.error(error.details);
  }
}`}
                  />
                </div>
              </Section>

              <Section id="supported-currencies" title="Supported currencies">
                <Table
                  headers={["Code", "Currency", "Country"]}
                  rows={[
                    ["NGN", "Nigerian Naira", "Nigeria"],
                    ["GHS", "Ghanaian Cedi", "Ghana"],
                    ["KES", "Kenyan Shilling", "Kenya"],
                    ["UGX", "Ugandan Shilling", "Uganda"],
                  ]}
                />
              </Section>

              <Section id="environment-variables" title="Environment variables">
                <Table
                  headers={["Variable", "Description"]}
                  rows={[
                    ["CLINK_SECRET_KEY", "Your Clink API key"],
                    [
                      "CLINK_WEBHOOK_SECRET",
                      "Secret for verifying webhook payloads",
                    ],
                  ]}
                />
                <p>
                  The SDK can read these values from your environment so you do
                  not have to hardcode them in your application.
                </p>
              </Section>
            </div>

            <div className="mt-14 border-t border-border pt-8">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="flex-1 rounded-2xl border border-border bg-surface px-5 py-5 transition hover:bg-surface-strong"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/38">
                    Previous
                  </p>
                  <p className="mt-2 text-lg tracking-[-0.03em] text-primary">
                    Back home
                  </p>
                </Link>
                <Link
                  href="/start"
                  className="flex-1 rounded-2xl border border-brand/10 bg-brand px-5 py-5 transition hover:opacity-95"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-secondary">
                    Next
                  </p>
                  <p className="mt-2 text-lg tracking-[-0.03em] text-tertiary">
                    Apply for an API key
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </article>

        <aside className="hidden border-l border-border xl:block">
          <div className="sticky top-18.25 h-[calc(100vh-73px)] overflow-y-auto px-5 py-8">
            <div className="space-y-6">
              <section>
                <h2 className="mb-3 text-sm font-medium text-primary">
                  On this page
                </h2>
                <div className="space-y-1">
                  {onThisPage.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-xl px-3 py-2 text-sm text-primary/55 transition hover:bg-surface hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </section>

              <section className="border-t border-border pt-6">
                <div className="space-y-2 text-sm text-primary/45">
                  <p>Need access?</p>
                  <Link
                    href="/start"
                    className="inline-flex rounded-xl border border-brand/10 bg-brand px-4 py-2 text-white! transition hover:opacity-95"
                  >
                    Get started
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
