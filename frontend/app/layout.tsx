import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-workbench",
  subsets: ["latin"],
});

const designContract = `<!--
THESIS: A maintained work register, not a centered stack of floating todo cards.
OWN-WORLD: Bone paper, graphite ink, deep-green rules and controls, restrained amber, one workhorse sans, squared fields, and fine ledger lines.
STORY: See the workload, enter a task, scan its record, then complete, reopen, or delete it with direct feedback.
FIRST VIEWPORT: A slim masthead spans the page; below it a one-third composer sits left of a dominant two-thirds task register, with Add task immediately after the two fields.
FORM: Control Ledger / Split Workbench, approved composition B; direction candidate 7; seed d17b0f83.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export const metadata: Metadata = {
  title: "Todo Tracker",
  description: "A focused workspace for keeping everyday tasks current.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoCondensed.variable}>
      <body>
        <script
          id="design-contract"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: designContract }}
        />
        {children}
      </body>
    </html>
  );
}
