import type { APIRoute } from 'astro';
import { site } from '../data/site';

/* /llms.txt — an index for LLM/AI-search consumption (playbook §4 AEO/GEO).
   Facts only, drawn from the same sources as the site itself. The preview gate
   and robots Disallow keep this private until launch, same as every page. */

export const GET: APIRoute = ({ site: configSite }) => {
  const base = (configSite?.href || 'https://www.smartaccountingsolutions.co.uk/').replace(/\/$/, '');
  const body = `# Smart Accounting Solutions

> Bookkeeping, accountancy and business support for small businesses, sole traders,
> landlords and limited companies across Yorkshire. Run by Craig Normington
> (25+ years experience), based in Penistone, South Yorkshire. Fixed monthly fees
> with unlimited support included. ${site.name} is a trading style of
> ${site.legalName}, registered in ${site.registeredIn}, company no. ${site.companyNumber}.

## Pages

- [Home](${base}/): what the service is and who it is for
- [About](${base}/about/): Craig Normington's story, how he works, the team
- [Services](${base}/services/): MTD for ITSA, bookkeeping bureau, VAT returns, payroll, management accounts, year-end accounts, personal and business tax returns, new business setup, bookkeeper training and support
- [Knowledge Base](${base}/knowledge-base/): plain-English answers on bookkeeping, VAT, payroll, CIS, tax and Companies House
- [Contact](${base}/contact/): phone ${site.phoneOffice}, email ${site.emailPrimary}, address ${site.address.street}, ${site.address.locality}, ${site.address.postcode}

## Key facts

- Services: bookkeeping, VAT returns, payroll, management accounts, year-end accounts, tax returns, MTD for ITSA support, new business setup, bookkeeper training
- Software: QuickBooks, Xero, Sage, FreeAgent, IRIS KashFlow
- Area served: Yorkshire, UK (based in Penistone, South Yorkshire)
- Pricing: agreed fixed fees; free initial conversation
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
