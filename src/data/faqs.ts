export interface KbLink { label: string; url: string; }
export interface KbQuestion { q: string; a: string; links?: KbLink[]; }
export interface KbSection { number: number; slug: string; title: string; questions: KbQuestion[]; }

// Source: client-supplied "SAS Final Website Questions and Answers" doc (2026-08-19).
export const kbSections: KbSection[] = [
  {
    number: 1,
    slug: 'starting-registrations-getting-set-up',
    title: 'Starting, Registrations & Getting Set Up',
    questions: [
      {
        q: 'Do I need an Accountant for my business?',
        a: 'No, you don\'t have to have an Accountant, but a good Accountant can save you time, help you save money and keep you on the right track. And when you\'re not sure what to do, you\'ve got someone there to help.',
      },
      {
        q: 'What\'s the difference between a sole trader and a limited company?',
        a: 'As a sole trader, you and the business are the same. You run the business personally in your own name. A limited company is separate from you; it is its own legal entity. Think of it as another person in the relationship: the company earns the money, has its own tax responsibilities and prepares its own accounts.',
      },
      {
        q: 'When should I change from a sole trader to a limited company?',
        a: 'There\'s no set point when you should change from a sole trader to a Ltd Company. It depends on your profits, your personal circumstances and what you want from the business. There are advantages and disadvantages to both. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'How do I register as self-employed and get a UTR?',
        a: 'You register as self-employed with HMRC online. HMRC will then issue you with a 10-digit Unique Taxpayer Reference (UTR). If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'I\'ve started working for myself. When do I need to tell HMRC?',
        a: 'If your self-employed turnover is more than £1,000 in a tax year, you need to register with HMRC for Self Assessment. You need to do this by 5 October following the end of that tax year. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Do I need a separate bank account if I\'m a sole trader?',
        a: 'No, you don\'t have to have a separate business bank account as a sole trader, but we highly recommend having one. It keeps your business and personal finances separate and makes your bookkeeping and producing your accounts much easier.',
      },
      {
        q: 'How much money should I put aside for tax?',
        a: 'There isn\'t one percentage that works for everyone. It depends on your profits, other income and how your business is set up. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is a Government Gateway account?',
        a: 'A Government Gateway account lets you sign in to HMRC\'s online services and manage your tax affairs online. When you set one up, you\'ll be given a Government Gateway user ID and asked to set up a password.',
        links: [{ label: 'Sign in to HMRC online services', url: 'https://www.gov.uk/log-in-register-hmrc-online-services' }],
      },
      {
        q: 'What\'s the difference between Government Gateway and GOV.UK One Login?',
        a: 'Government Gateway is the existing system used to access HMRC services, while GOV.UK One Login is the new system being introduced across government to replace it. If you already have a Government Gateway, keep using it until HMRC asks you to change.',
      },
      {
        q: 'How do I set up a GOV.UK One Login?',
        a: 'You\'ll be asked to create a GOV.UK One Login when you access a government service that uses it. You\'ll need an email address and password, and you may also be asked to prove your identity.',
        links: [{ label: 'GOV.UK One Login', url: 'https://www.gov.uk/using-your-gov-uk-one-login' }],
      },
      {
        q: 'How do I set up a Government Gateway account?',
        a: 'When you access an HMRC service for the first time, you\'ll be given the option to create new sign-in details. HMRC will then take you through the steps to get set up.',
        links: [{ label: 'Set up HMRC online access', url: 'https://www.gov.uk/log-in-register-hmrc-online-services' }],
      },
      {
        q: 'How do I access my Personal Tax Account?',
        a: 'You can access your Personal Tax Account online through GOV.UK. It\'s where you can see things like your tax code, National Insurance number and other personal tax information held by HMRC.',
        links: [{ label: 'Personal Tax Account', url: 'https://www.gov.uk/personal-tax-account' }],
      },
      {
        q: 'I\'ve forgotten my Government Gateway details. What do I do?',
        a: 'Don\'t set up another account. When you try to sign in, HMRC will give you the option to recover your Government Gateway user ID or reset your password.',
        links: [{ label: 'Get help signing in to HMRC online services', url: 'https://www.gov.uk/log-in-register-hmrc-online-services/problems-signing-in' }],
      },
      {
        q: 'Do I need a separate Government Gateway account for my business and personal taxes?',
        a: 'If you\'re a sole trader, your personal and business taxes can be managed through the same HMRC online account. A Ltd Company\'s tax affairs are separate from your personal taxes, so the Company needs its own HMRC online access. You don\'t need a separate account for every individual tax.',
      },
      {
        q: 'Where can I find my personal UTR?',
        a: 'Your UTR is your 10-digit Unique Taxpayer Reference. You can find it in your Personal Tax Account, the HMRC app, previous Tax Returns or letters from HMRC.',
        links: [{ label: 'Find your UTR number', url: 'https://www.gov.uk/find-utr-number' }],
      },
      {
        q: 'Where can I find my National Insurance number?',
        a: 'Your National Insurance number is made up of two letters, six numbers and a final letter. You\'ll find it in your Personal Tax Account, the HMRC app or on documents such as your payslip, P60 or letters from HMRC.',
        links: [{ label: 'Find your National Insurance number', url: 'https://www.gov.uk/find-national-insurance-number' }],
      },
      {
        q: 'How do I set up a new limited company?',
        a: 'You set up a Ltd Company online by registering it with Companies House. You\'ll need to decide things like the Company name and who the directors and shareholders are going to be before you start. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is a Certificate of Incorporation?',
        a: 'A Certificate of Incorporation is the official document confirming that your limited company has been registered with Companies House. Think of it as your company\'s birth certificate.',
      },
      {
        q: 'Does my limited company need a separate bank account?',
        a: 'Yes. A limited company is separate from you personally, so its money should be kept separate from your own. A separate company bank account also makes the bookkeeping much cleaner and easier to manage.',
      },
      {
        q: 'What information do I need to open a Company bank account?',
        a: 'You\'ll need your Company details, your Certificate of Incorporation and identification for the directors of the Company. The bank will then tell you what else it needs, as each bank has different criteria.',
      },
      {
        q: 'Where can I find my Company\'s UTR?',
        a: 'Your Company\'s UTR is a 10-digit number which HMRC sends to the Company\'s registered office after it is set up. You\'ll also find it on Corporation Tax letters from HMRC. If you can\'t find it, you can ask HMRC to send it again.',
        links: [{ label: 'Find your UTR number', url: 'https://www.gov.uk/find-utr-number' }],
      },
      {
        q: 'How do I register my Limited Company for Corporation Tax?',
        a: 'Your Ltd Company is automatically registered for Corporation Tax when you register it online with Companies House. HMRC will then send the Company its 10-digit UTR to the registered office address.',
      },
      {
        q: 'How do I register as an employer for PAYE?',
        a: 'You register as an employer for PAYE online with HMRC. You need to register before your first payday. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What\'s the difference between my PAYE reference and my Accounts Office reference?',
        a: 'Your PAYE Reference identifies your PAYE scheme. Your Accounts Office Reference is used when making PAYE payments to HMRC.',
      },
      {
        q: 'How do I add Corporation Tax, VAT, PAYE or CIS to my HMRC online account?',
        a: 'Once you\'re registered for a tax, you can add it to your HMRC online account. Depending on the tax, you\'ll enter the relevant registration details and, where required, request and enter an activation code. If you need help, get in touch and we\'ll be happy to help.',
      },
    ],
  },
  {
    number: 2,
    slug: 'bookkeeping-expenses',
    title: 'Bookkeeping & Expenses',
    questions: [
      {
        q: 'What is a bank feed, how does Open Banking work, and is it safe?',
        a: 'A bank feed is a secure connection between your bank and accounting software such as QuickBooks. Bank feeds often use Open Banking to securely bring your transactions into the software. This doesn\'t give your Accountant or bookkeeper access to your online banking or allow them to make payments or move your money.',
      },
      {
        q: 'What expenses can I claim through my business?',
        a: 'You can claim expenses that are genuinely for your business and allowed for tax. Exactly what you can claim depends on what you do and how your business is set up. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Can I put personal expenses through my business?',
        a: 'Yes, you can pay a personal expense from your business bank account, but that doesn\'t make it a business expense. How it\'s dealt with depends on whether you\'re a sole trader or a Ltd Company.',
      },
      {
        q: 'Can I claim for a car or van through my business?',
        a: 'Yes, but how you claim depends on the vehicle, how you use it and how your business is set up. Depending on the circumstances, you claim either mileage or the relevant costs of buying and running the vehicle. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Do I need to keep paper invoices and receipts?',
        a: 'No. If you\'ve kept a clear and complete digital copy of an invoice or receipt, you don\'t need to keep the paper copy as well.',
      },
      {
        q: 'What happens if I\'ve lost an invoice or receipt?',
        a: 'Don\'t panic if you\'ve lost the odd invoice or receipt. Ask the supplier for a copy first; if you can\'t get one, other records can sometimes be used to show what you bought and what it was for. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'How long do I need to keep my business records?',
        a: 'If you\'re self-employed, you need to keep your records for at least five years after the 31 January Tax Return deadline. If you run a Ltd Company, you need to keep them for six years from the end of the financial year they relate to.',
      },
    ],
  },
  {
    number: 3,
    slug: 'vat',
    title: 'VAT',
    questions: [
      {
        q: 'Can I register for VAT before I reach the VAT threshold?',
        a: 'Yes, you can register for VAT voluntarily before you reach the VAT threshold. Whether it\'s worth doing depends on your circumstances, including the VAT you\'re paying on business purchases and the effect VAT registration will have on your customers. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'I\'ve gone over the VAT threshold. What should I do?',
        a: 'If you\'ve gone over the VAT threshold, you will normally need to register for VAT. If you\'ve only gone over the threshold temporarily, this may not be the case. If you\'re unsure, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'How do I register for VAT?',
        a: 'You register for VAT online with HMRC using an online application form. You\'ll need information about your business, including its turnover and other details. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'How long does it take to register for VAT?',
        a: 'The application itself is quick to complete, but HMRC can take several weeks to process your VAT registration. If you haven\'t heard after 40 working days, HMRC says you should contact the VAT Registration Service. Some applications take longer if HMRC needs more information.',
      },
      {
        q: 'Should I charge VAT while I\'m waiting for my VAT registration to come through?',
        a: 'You can\'t show VAT separately on your invoices until you receive your VAT number, but you\'ll still need to account for VAT from your VAT registration date. If you\'re waiting for your VAT number and aren\'t sure what to charge, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Can I claim VAT on expenses from before I registered for VAT?',
        a: 'Yes. You can reclaim VAT on goods bought up to four years before you registered, provided you still have them, and on services from up to six months before registration. You need to have the invoice or receipt and the purchase must relate to the business. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Can I claim VAT without an invoice or receipt?',
        a: 'You need a valid VAT invoice or receipt to claim VAT back. If you\'ve lost it, ask the supplier for a replacement first. HMRC can accept other evidence in some circumstances. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What expenses can I claim VAT on?',
        a: 'You can claim VAT back on purchases that are for your business, provided VAT has been charged correctly and you have the invoice or receipt. There are exceptions, so if you\'re unsure whether you can claim VAT or not, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is the VAT Flat Rate Scheme?',
        a: 'The VAT Flat Rate Scheme is a simpler way for some small businesses to work out the VAT they pay to HMRC. Instead of accounting for VAT on your sales and claiming VAT back on most purchases, you pay HMRC a fixed percentage of your turnover including VAT.',
      },
      {
        q: 'What is the VAT Annual Accounting Scheme?',
        a: 'The VAT Annual Accounting Scheme allows you to submit one VAT Return a year instead of the usual four. You make payments towards your VAT bill during the year, either monthly or quarterly, with any balance dealt with when you submit your annual return. If you need help deciding whether it\'s right for your business, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Do I need Making Tax Digital (MTD) for VAT?',
        a: 'Yes, VAT-registered businesses normally need to keep digital VAT records and submit their VAT Returns using compatible software. There are exemptions in certain circumstances.',
      },
      {
        q: 'How often do I need to submit a VAT Return?',
        a: 'Most businesses submit a VAT Return every three months, but VAT Returns can also be submitted monthly or annually depending on the VAT scheme or arrangements you have in place.',
      },
      {
        q: 'How do I pay my VAT bill?',
        a: 'You pay your VAT bill directly to HMRC using your 9-digit VAT registration number as the payment reference. There are several ways to pay, including Direct Debit, online banking and debit card.',
        links: [{ label: 'Pay your VAT bill', url: 'https://www.gov.uk/pay-vat' }],
      },
    ],
  },
  {
    number: 4,
    slug: 'payroll-employees-benefits',
    title: 'Payroll, Employees & Benefits',
    questions: [
      {
        q: 'I\'ve taken on my first employee. What do I need to do?',
        a: 'You\'ll need to register as an employer with HMRC, set up payroll and make sure your employee is paid and reported to HMRC correctly. You\'ll also need to check whether you need to set up a workplace pension. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'When do I need to register as an employer?',
        a: 'You need to register as an employer before your first payday. You can register up to two months before you start paying your employees.',
      },
      {
        q: 'What is a P45?',
        a: 'A P45 is given to an employee when they leave a job. It shows things like their pay and tax so far in the tax year and their tax code. Their new employer uses this information to help make sure they\'re taxed correctly.',
      },
      {
        q: 'What is Employer\'s National Insurance?',
        a: 'Employer\'s National Insurance is an extra cost employers pay on employees\' earnings above the relevant threshold. It\'s calculated using a percentage set by HMRC.',
      },
      {
        q: 'What is Employment Allowance, and can my business claim it?',
        a: 'Employment Allowance reduces the amount of employer\'s National Insurance your business has to pay. Whether you can claim it depends on your business. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is a P32, and is it the same as a P30?',
        a: 'A P32 is a payroll report showing the tax, National Insurance and other amounts you need to pay HMRC. You may also hear it called a P30, although P32 is the term most payroll software uses now.',
      },
      {
        q: 'How do I pay my PAYE bill?',
        a: 'You pay your PAYE bill directly to HMRC. You can pay by bank transfer, Direct Debit or debit card. The payment reference you need will be shown on your payroll report, such as your P30 or P32.',
        links: [{ label: 'Pay employers\' PAYE', url: 'https://www.gov.uk/pay-paye-tax' }],
      },
      {
        q: 'What is auto-enrolment, and do I need to provide a workplace pension?',
        a: 'Auto-enrolment means employers have to put eligible employees into a workplace pension and pay into it. If you employ staff, you\'ll have pension duties even if none of your employees need to be automatically enrolled.',
      },
      {
        q: 'What is salary sacrifice?',
        a: 'Salary sacrifice is where an employee agrees to give up part of their salary in return for something else from their employer, such as a pension contribution or certain other benefits.',
      },
      {
        q: 'What is the Cycle to Work Scheme?',
        a: 'The Cycle to Work Scheme allows an employer to provide an employee with a bike and cycling equipment, usually through salary sacrifice.',
      },
      {
        q: 'What is Statutory Sick Pay (SSP), and can my business reclaim it?',
        a: 'Statutory Sick Pay is sick pay an employer has to pay an eligible employee when they\'re off work because they\'re ill. You cannot reclaim SSP from HMRC. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is Statutory Maternity Pay (SMP), and can my business reclaim it?',
        a: 'Statutory Maternity Pay is pay an employer has to provide when an eligible employee takes maternity leave. Employers can reclaim some or all of the SMP they pay from HMRC. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is Statutory Paternity Pay (SPP), and can my business reclaim it?',
        a: 'Statutory Paternity Pay is pay an employer has to provide when an eligible employee takes paternity leave. Employers can reclaim some or all of the SPP they pay from HMRC. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is Statutory Adoption Pay, and can my business reclaim it?',
        a: 'Statutory Adoption Pay is pay an employer has to provide when an eligible employee takes adoption leave. Employers can reclaim some or all of the Statutory Adoption Pay they pay from HMRC. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is an attachment of earnings?',
        a: 'An attachment of earnings is an instruction requiring an employer to deduct money from an employee\'s wages to repay a debt. The employer makes the deduction through payroll and pays the money to the organisation named on the order.',
      },
      {
        q: 'What\'s the difference between a pre-tax and post-tax deduction?',
        a: 'A pre-tax deduction is taken before the employee\'s tax is worked out. A post-tax deduction is taken after tax has been calculated.',
      },
      {
        q: 'What is a benefit in kind?',
        a: 'A benefit in kind is something an employee or director receives from their employer on top of their salary, such as a company car or private medical insurance. Some benefits are taxable and need to be reported to HMRC.',
      },
      {
        q: 'What is a P11D?',
        a: 'A P11D is used to report certain taxable benefits an employee or director has received from their employer. This can include things like Company cars or private medical insurance, but there are lots of other benefits it can cover. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is changing with P11Ds from April 2027?',
        a: 'From April 2027, some benefits that are currently reported after the year end on a P11D form will have to be reported through your payroll system instead. This will include Company cars and vans, car and van fuel, and medical benefits. Other benefits will also be brought into the new system from April 2028.',
      },
      {
        q: 'I\'ve given an employee a Company car. What do I need to do?',
        a: 'You\'ll need to tell HMRC about the Company car and work out the taxable benefit for the employee. The Company will also have Class 1A National Insurance to pay on the benefit. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What happens if an employee pays for their own private fuel?',
        a: 'If the employee pays for all their own private fuel, there will be no separate Company fuel benefit. They would still have a taxable benefit for having the Company car or van itself.',
      },
      {
        q: 'What\'s the difference between a Company car and a Company van or commercial vehicle?',
        a: 'HMRC has different tax rules for Company cars and Company vans or other commercial vehicles. How the vehicle is treated depends on the type of vehicle and how it is designed. If you\'re unsure how your vehicle should be treated, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Is an electric car, van or commercial vehicle more tax-efficient than a petrol or diesel vehicle?',
        a: 'Electric Company cars can have a lower taxable benefit than petrol or diesel cars. Vans and other commercial vehicles have different tax rules, so the position will depend on the type of vehicle. If you\'re thinking about buying a vehicle through your business, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is a P60?',
        a: 'A P60 shows an employee\'s total pay and tax for the tax year. If they\'re still employed on 5 April, their employer must give them a P60 by 31 May.',
      },
    ],
  },
  {
    number: 5,
    slug: 'construction-industry-scheme-contractors-subcontractors',
    title: 'Construction Industry Scheme (CIS) - Contractors & Subcontractors',
    questions: [
      {
        q: 'What is the Construction Industry Scheme (CIS)?',
        a: 'The Construction Industry Scheme (CIS) is an HMRC scheme for contractors and subcontractors working in construction. Contractors may have to deduct CIS tax from payments they make to subcontractors and pay it to HMRC. For subcontractors, any CIS tax deducted is taken off the tax they have to pay.',
      },
      {
        q: 'How do I register as a CIS contractor?',
        a: 'You register as a CIS contractor online with HMRC. If you already have a PAYE scheme, HMRC will add CIS to your existing scheme. If you don\'t have a PAYE scheme, you\'ll need to register as a new employer and HMRC will set up your CIS contractor scheme. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'I\'m a sole trader with a UTR. Do I still need to register as a CIS subcontractor?',
        a: 'Yes. Having a UTR doesn\'t automatically mean you\'re registered for CIS. If you\'re working as a subcontractor in the construction industry, you\'ll need to register separately for CIS.',
      },
      {
        q: 'How do I register as a CIS subcontractor?',
        a: 'You register as a CIS subcontractor online with HMRC. You\'ll need your UTR and some basic business details. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is CIS verification, and how does it work?',
        a: 'CIS verification is where a contractor checks a subcontractor with HMRC. The contractor checks the subcontractor through the HMRC online service to make sure they\'re registered for CIS and find out what rate of CIS tax, if any, needs to be deducted from their payments.',
      },
      {
        q: 'How much CIS tax will be deducted from me?',
        a: 'The CIS deduction is 20% if you\'re registered with HMRC and is calculated on your labour only. If you\'re not registered or can\'t be verified, 30% will be deducted.',
      },
      {
        q: 'What is CIS gross payment status?',
        a: 'Gross payment status means your contractors pay you without deducting CIS tax. You\'ll then be responsible for paying your tax when it\'s due. You have to meet HMRC\'s rules to qualify for it.',
        links: [{ label: 'CIS Gross Payment Status', url: 'https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/gross-payment-status' }],
      },
      {
        q: 'How do I get back CIS tax that\'s been deducted from me?',
        a: 'If you\'re a sole trader or partner, you reclaim CIS deductions through your Self Assessment Tax Return. The CIS tax deducted is offset against the tax you have to pay, and any overpayment is refunded. If you trade through a Ltd Company, the CIS deductions are claimed through the Company\'s payroll and offset against its PAYE bill. Any CIS that can\'t be offset during the tax year can be reclaimed from HMRC after 5 April.',
      },
      {
        q: 'I\'m both a CIS contractor and subcontractor. How does it work?',
        a: 'If you\'re a sole trader or partner, the CIS deducted from you is reclaimed through your Self Assessment Tax Return. Any CIS you deduct from your own subcontractors is reported on your monthly CIS return and paid to HMRC separately. If you trade through a Ltd Company, the CIS deducted from you is offset against the CIS and PAYE you have to pay to HMRC. If you\'ve had more CIS deducted from you than you need to pay, the difference is carried forward during the tax year and any amount left after 5 April can be reclaimed from HMRC. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'I\'ve deducted CIS from my subcontractors. How do I pay it to HMRC?',
        a: 'Once you\'ve submitted your CIS return, you pay the CIS deductions directly to HMRC in the same way as your PAYE bill. If you pay electronically, the payment is due by the 22nd after the end of the CIS period.',
        links: [{ label: 'Pay CIS deductions to HMRC', url: 'https://www.gov.uk/what-you-must-do-as-a-cis-contractor/pay-deductions-to-hmrc' }],
      },
      {
        q: 'When do I need to submit my CIS return?',
        a: 'You need to submit a CIS return every month by the 19th. The return covers the CIS period ending on the 5th of that month.',
      },
      {
        q: 'I\'ve missed my CIS return. What should I do?',
        a: 'Submit it as soon as possible. HMRC can charge penalties for late CIS returns, and the penalties increase the longer the return is outstanding. If you need help, get in touch and we\'ll be happy to help.',
      },
    ],
  },
  {
    number: 6,
    slug: 'management-accounts-cash-flow-understanding-your-figures',
    title: 'Management Accounts, Cash Flow & Understanding Your Figures',
    questions: [
      {
        q: 'What\'s the difference between management accounts and year-end accounts?',
        a: 'Management accounts are prepared during the year to show you how your business is performing and help you make decisions. Year-end accounts look back at the financial year as a whole, show the profit your business has made and are used to calculate the tax due.',
      },
      {
        q: 'My business is making a profit, so why is there no money in the bank?',
        a: 'Making a profit doesn\'t mean that money will still be sitting in your bank account. It could be tied up in unpaid invoices or stock, or you could have spent it on things like equipment, tax, loan repayments or money you\'ve taken out of the business. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What are KPIs?',
        a: 'KPIs, or Key Performance Indicators, are important numbers you use to measure how your business is performing. They could include things like sales, profit margin, average customer spend, debtor days or the number of new customers you\'re winning. The KPIs that matter will be different for every business. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is EBITDA?',
        a: 'EBITDA stands for Earnings Before Interest, Tax, Depreciation and Amortisation. Put simply, it\'s a way of looking at how the business itself is performing before taking into account things like how it\'s financed, tax and certain accounting adjustments. It\'s often used to compare the performance of different businesses or when valuing a business. If you need help, get in touch and we\'ll be happy to help.',
      },
    ],
  },
  {
    number: 7,
    slug: 'year-end-accounts-tax-sole-traders-self-assessment',
    title: 'Year-End Accounts & Tax - Sole Traders / Self Assessment',
    questions: [
      {
        q: 'Does a sole trader need to prepare year-end accounts?',
        a: 'No. A sole trader does not have to prepare or file a formal set of year-end accounts with HMRC. You do still need to work out your year-end figures so they can be used to complete your Self Assessment Tax Return and calculate the tax due.',
      },
      {
        q: 'When is a sole trader\'s year end?',
        a: 'A sole trader is taxed on their profits for the tax year ending 5 April. In practice, accounts are often prepared to 31 March and HMRC allows these figures to be used for the tax year.',
      },
      {
        q: 'What information do I need to give my Accountant to prepare my year-end accounts?',
        a: 'Your Accountant will need details of your business income and expenses. This could include bank statements, sales invoices, purchase invoices and receipts, details of any loans or finance, and information about anything you\'ve bought for the business such as equipment or vehicles.',
      },
      {
        q: 'What\'s the difference between my accounts and my Self Assessment Tax Return?',
        a: 'Your accounts show your business income, expenses and profit for the year. Your Self Assessment Tax Return reports your income to HMRC and works out how much tax you need to pay.',
      },
      {
        q: 'Do I need an Accountant to prepare my accounts and Self Assessment Tax Return?',
        a: 'No. You can prepare your own accounts and Tax Return, but using an Accountant can help make sure everything is correct and you\'re not paying more tax than you need to. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'When do I need to complete a Self Assessment Tax Return?',
        a: 'If you file your Self Assessment Tax Return online, it is due by 31 January following the end of the tax year. If you file a paper Tax Return, it is due by 31 October.',
      },
      {
        q: 'What expenses can I claim if I\'m a sole trader?',
        a: 'You can claim expenses you incur while carrying out your business, such as business insurance, software, advertising and business travel. If you need help working out what you can and can\'t claim, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'I have rental income. Do I need to complete a Self Assessment Tax Return?',
        a: 'If your rental income is more than £1,000 a year, you need to tell HMRC. Depending on how much rental income you receive, this will either be through a Self Assessment Tax Return or HMRC will deal with the tax another way. If you\'re not sure what you need to do, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'I haven\'t declared rental income in the past. What should I do?',
        a: 'You should tell HMRC about any rental income you should have declared in the past. HMRC has a dedicated scheme called the Let Property Campaign to help you bring your tax affairs up to date. There may be tax, interest and penalties to pay, but the scheme is there to help you put things right. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is the Let Property Campaign?',
        a: 'The Let Property Campaign is a dedicated HMRC scheme to help landlords bring their tax affairs up to date if they haven\'t declared rental income in the past. There may be tax, interest and penalties to pay, but the scheme is there to help you put things right. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'I filed my Self Assessment Tax Return myself and made a mistake. What should I do?',
        a: 'A Tax Return can normally be amended online within 12 months of the filing deadline. If it\'s an older Tax Return, you can still correct it, but you\'ll normally need to write to HMRC. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What are payments on account?',
        a: 'Payments on Account are advance payments towards your next Self Assessment tax bill. They\'re paid twice a year, on 31 January and 31 July, with each payment based on half of the previous year\'s tax bill. They usually apply if your tax bill is more than £1,000.',
      },
      {
        q: 'Why is my January tax bill higher than I expected?',
        a: 'Your January tax bill can be higher because you\'re paying the balance of tax due for the current year, and you could also be paying your first Payment on Account towards the following year. Payments on Account usually apply if your tax bill is more than £1,000.',
      },
      {
        q: 'How do I pay my Self Assessment tax bill?',
        a: 'You pay your Self Assessment tax bill directly to HMRC. You can pay online, by bank transfer or Direct Debit, with other payment options also available.',
        links: [{ label: 'Pay your Self Assessment tax bill', url: 'https://www.gov.uk/pay-self-assessment-tax-bill' }],
      },
      {
        q: 'What happens if I file my Self Assessment Tax Return late?',
        a: 'If your Self Assessment Tax Return is late, you will receive a £100 penalty. Further penalties can be added the longer it remains outstanding, so you should submit it as soon as possible. If your Tax Return is late and you need help, get in touch and we\'ll be happy to help.',
      },
    ],
  },
  {
    number: 8,
    slug: 'year-end-accounts-tax-limited-companies',
    title: 'Year-End Accounts & Tax - Limited Companies',
    questions: [
      {
        q: 'What are limited company year-end accounts?',
        a: 'Limited Company year-end accounts show the Company\'s income and expenditure for the year and its assets and liabilities at the year-end date.',
      },
      {
        q: 'What information does my Accountant need to prepare my limited company accounts?',
        a: 'Your Accountant will need details of the Company\'s income and expenses. This could include bank statements, sales invoices, purchase invoices and receipts, details of any loans or finance, and information about anything the Company has bought such as equipment or vehicles.',
      },
      {
        q: 'When are my limited company accounts due?',
        a: 'Your Ltd Company accounts are due at Companies House nine months after your year end. Your first set of accounts can have a different deadline, so check the filing date shown at Companies House.',
      },
      {
        q: 'Do I have to file my limited company accounts with Companies House?',
        a: 'Yes. All Ltd Companies need to file annual accounts with Companies House, even if the Company isn\'t trading.',
      },
      {
        q: 'Can anyone see my Company\'s accounts on Companies House?',
        a: 'Yes. Accounts filed with Companies House form part of the public record and can be viewed online. The amount of information shown depends on the size of the Company and the type of accounts filed.',
      },
      {
        q: 'What happens if I file my limited company accounts late?',
        a: 'If your Company accounts are late, Companies House will charge a penalty. The penalty increases the longer the accounts remain outstanding, so you should file them as soon as possible. If your accounts are late and you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What\'s the difference between my company accounts and my Corporation Tax Return?',
        a: 'Your Company accounts show how the business has performed. Your Corporation Tax Return takes the figures from those accounts and works out how much Corporation Tax is due.',
      },
      {
        q: 'What\'s the difference between my company year end and my personal tax year?',
        a: 'Your Company has its own year-end date, which is the date its annual accounts are prepared up to. Your personal tax year runs from 6 April to 5 April and is separate from the Company.',
      },
      {
        q: 'What\'s the difference between Corporation Tax and Self Assessment tax?',
        a: 'Corporation Tax is a tax paid by a Ltd Company. Self Assessment Tax is tax you pay personally.',
      },
      {
        q: 'When is my Corporation Tax due?',
        a: 'Corporation Tax is normally due 9 months and 1 day after your Company\'s year end.',
      },
      {
        q: 'How do I pay my Corporation Tax?',
        a: 'You pay your Corporation Tax directly to HMRC. You can pay by bank transfer, Direct Debit or debit card. You\'ll need the Corporation Tax payment reference for the accounting period you\'re paying.',
        links: [{ label: 'Pay your Corporation Tax bill', url: 'https://www.gov.uk/pay-corporation-tax' }],
      },
    ],
  },
  {
    number: 9,
    slug: 'year-end-accounts-tax-partnerships',
    title: 'Year-End Accounts & Tax - Partnerships',
    questions: [
      {
        q: 'What are partnership accounts?',
        a: 'Partnership accounts show the partnership\'s income and expenses and work out the profit or loss for the year.',
      },
      {
        q: 'Does a partnership need year-end accounts?',
        a: 'No. A partnership does not have to prepare or file a formal set of year-end accounts with HMRC. It does still need to work out its year-end figures so they can be used to complete the Partnership Tax Return.',
      },
      {
        q: 'What is a partnership UTR?',
        a: 'A partnership UTR is the 10-digit Unique Taxpayer Reference HMRC issues to the partnership when it is registered. This is separate from the personal UTR each partner has for their own Self Assessment.',
      },
      {
        q: 'What information does my Accountant need to prepare partnership accounts?',
        a: 'Your Accountant will need details of the partnership\'s income and expenses. This could include bank statements, sales invoices, purchase invoices and receipts, details of any loans or finance, and information about anything the partnership has bought such as equipment or vehicles.',
      },
      {
        q: 'Does a partnership need its own Tax Return?',
        a: 'Yes. A partnership needs to complete its own Partnership Tax Return showing the income, expenses and profit of the business.',
      },
      {
        q: 'Do the partners also need to complete their own Self Assessment Tax Returns?',
        a: 'Yes. Each partner needs to complete their own Self Assessment Tax Return and include their share of the partnership\'s profit.',
      },
      {
        q: 'How is partnership profit split between the partners?',
        a: 'Partnership profit is split between the partners based on the profit-sharing agreement in place. It does not have to be split equally if the partners have agreed a different split.',
      },
      {
        q: 'Do partners pay tax on the partnership profit or the money they take out?',
        a: 'Partners pay tax on their share of the partnership profit, not the amount of money they take out of the business.',
      },
      {
        q: 'When do partnership accounts and Tax Returns need to be completed?',
        a: 'The partnership accounts need to be completed in time for the Tax Returns. The Partnership Tax Return and each partner\'s Self Assessment Tax Return are due by 31 January following the end of the tax year.',
      },
      {
        q: 'Do I need to tell HMRC if a partner joins or leaves?',
        a: 'Yes. You need to tell HMRC if a partner joins or leaves the partnership so they can update their records.',
      },
    ],
  },
  {
    number: 10,
    slug: 'year-end-accounts-tax-limited-liability-partnerships',
    title: 'Year-End Accounts & Tax - Limited Liability Partnerships (LLPs)',
    questions: [
      {
        q: 'What is a Limited Liability Partnership (LLP)?',
        a: 'A Limited Liability Partnership (LLP) is a type of partnership that is registered with Companies House and gives its members limited liability.',
      },
      {
        q: 'What\'s the difference between an LLP and an ordinary partnership?',
        a: 'An LLP is registered with Companies House and has to file accounts there. An ordinary partnership does not. Both are taxed using partnership tax rules.',
      },
      {
        q: 'Does an LLP need to prepare year-end accounts?',
        a: 'Yes. An LLP needs to prepare year-end accounts each year and file them with Companies House.',
      },
      {
        q: 'What information does my Accountant need to prepare LLP accounts?',
        a: 'Your Accountant will need details of the LLP\'s income and expenses. This could include bank statements, sales invoices, purchase invoices and receipts, details of any loans or finance, and information about anything the LLP has bought such as equipment or vehicles.',
      },
      {
        q: 'Does an LLP file accounts with Companies House?',
        a: 'Yes. All LLPs need to file annual accounts with Companies House, even if the LLP isn\'t trading.',
      },
      {
        q: 'Can anyone see an LLP\'s accounts at Companies House?',
        a: 'Yes. Accounts filed with Companies House form part of the public record and can be viewed online. The amount of information shown depends on the size of the LLP and the type of accounts filed.',
      },
      {
        q: 'What is an LLP Confirmation Statement?',
        a: 'An LLP Confirmation Statement is an annual filing that confirms the information Companies House holds about the LLP is correct and up to date. You need to file one every year, even if nothing has changed.',
      },
      {
        q: 'Does an LLP also need to file a Partnership Tax Return?',
        a: 'Yes. An LLP needs to complete and file a Partnership Tax Return with HMRC.',
      },
      {
        q: 'Do LLP members need to complete their own Self Assessment Tax Returns?',
        a: 'Yes. Each individual member needs to complete their own Self Assessment Tax Return and include their share of the LLP\'s profit.',
      },
      {
        q: 'How are LLP members taxed?',
        a: 'Each individual member pays tax on their share of the LLP\'s profit by declaring it on their Self Assessment Tax Return.',
      },
      {
        q: 'When are LLP accounts due?',
        a: 'Your LLP accounts are due at Companies House nine months after your year end. Your first set of accounts can have a different deadline, so check the filing date shown at Companies House.',
      },
      {
        q: 'What happens if an LLP files its accounts late?',
        a: 'If your LLP accounts are late, Companies House will charge a penalty. The penalty increases the longer the accounts remain outstanding, so you should file them as soon as possible. If your accounts are late and you need help, get in touch and we\'ll be happy to help.',
      },
    ],
  },
  {
    number: 11,
    slug: 'personal-hmrc-records-national-insurance-tax-codes',
    title: 'Personal HMRC Records, National Insurance & Tax Codes',
    questions: [
      {
        q: 'How do I check my National Insurance record and see if I have any gaps?',
        a: 'You can check your National Insurance record online through GOV.UK. It will show your National Insurance history and any gaps in your record.',
        links: [{ label: 'Check your National Insurance record', url: 'https://www.gov.uk/check-national-insurance-record' }],
      },
      {
        q: 'Can I pay voluntary National Insurance to fill gaps in my record?',
        a: 'Yes. You can pay voluntary National Insurance to fill gaps in your National Insurance record.',
      },
      {
        q: 'How far back can I pay voluntary National Insurance?',
        a: 'You can normally pay voluntary National Insurance for the previous six tax years. The deadline is 5 April each year.',
      },
      {
        q: 'How do I check my State Pension forecast?',
        a: 'You can check your State Pension forecast online through GOV.UK or through the HMRC app. It will show how much State Pension you could get and when you can get it.',
        links: [{ label: 'Check your State Pension forecast', url: 'https://www.gov.uk/check-state-pension' }],
      },
      {
        q: 'What is a Notice of Coding?',
        a: 'A Notice of Coding is a letter or online notification from HMRC explaining your tax code and how they have worked it out.',
      },
      {
        q: 'Why has HMRC changed my tax code?',
        a: 'HMRC may change your tax code when the information they hold about your income or circumstances changes. If you think your tax code is wrong, you can check it online and update any information that is incorrect.',
        links: [{ label: 'Check your Income Tax for the current year', url: 'https://www.gov.uk/check-income-tax-current-year' }],
      },
      {
        q: 'Why do I have more than one tax code?',
        a: 'You can have more than one tax code if you have income from more than one job or pension. Each employer or pension provider uses the tax code HMRC gives them to work out how much tax to deduct.',
      },
      {
        q: 'What happens to my tax if I have two jobs?',
        a: 'You\'ll have a tax code for each job, but you only get one Personal Allowance. HMRC uses your tax codes to collect the tax due across your jobs.',
      },
    ],
  },
  {
    number: 12,
    slug: 'limited-companies-companies-house',
    title: 'Limited Companies & Companies House',
    questions: [
      {
        q: 'What\'s the difference between a director and a shareholder?',
        a: 'A director is responsible for running the Company. A shareholder owns shares in the Company. You can be both a director and a shareholder.',
      },
      {
        q: 'What are my responsibilities as a company director?',
        a: 'As a director, you\'re responsible for running the Company and making sure it meets its legal responsibilities, including keeping records and making sure accounts and other information are filed on time.',
      },
      {
        q: 'Should I make my spouse a director of my Ltd Company?',
        a: 'You should only make your spouse a director if there is a reason for them to be involved in running the Company. Being a director comes with legal responsibilities. If you\'re unsure whether it\'s right for you, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Should I make my spouse a shareholder in my limited company?',
        a: 'It can be beneficial in some circumstances, but giving someone shares also gives them ownership of part of the Company. It\'s worth getting advice before making any changes. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'Can I pay my spouse a wage through my Ltd Company?',
        a: 'Yes. You can pay your spouse a wage if they work for the Company. The wage should be reasonable for the work they do and dealt with correctly through payroll.',
      },
      {
        q: 'Can I take money out of my Ltd Company whenever I want?',
        a: 'Yes. You can take money out of your Company whenever you want, but you need to make sure it is accounted for correctly. If you\'re unsure how the money should be dealt with, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is a director\'s loan account?',
        a: 'A Director\'s Loan Account keeps track of money you put into or take out of your Company. The balance can then be offset against things like salary, dividends or expenses where appropriate.',
      },
      {
        q: 'Can my Ltd Company pay for personal expenses?',
        a: 'Yes. You can pay a personal expense from your Company\'s bank account, but that doesn\'t make it a business expense. How it\'s dealt with will depend on the circumstances.',
      },
      {
        q: 'Should I pay myself a salary or dividends?',
        a: 'Most Company directors use a combination of salary and dividends, but the right balance depends on your circumstances and the Company\'s profits. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is a Confirmation Statement?',
        a: 'A Confirmation Statement is an annual filing that confirms the information Companies House holds about your Company is correct and up to date. You need to file one every year, even if nothing has changed.',
      },
      {
        q: 'What is a Person with Significant Control (PSC)?',
        a: 'A Person with Significant Control (PSC) is someone who has significant ownership or control over a Company. They don\'t necessarily have to be a director or shareholder to be a PSC.',
      },
      {
        q: 'What is a Companies House authentication code?',
        a: 'A Companies House authentication code is a 6-character code used to file information online for your Company. Think of it like a PIN for your Company and keep it safe.',
      },
    ],
  },
  {
    number: 13,
    slug: 'companies-house-identity-verification',
    title: 'Companies House Identity Verification',
    questions: [
      {
        q: 'What is Companies House identity verification and why has it been introduced?',
        a: 'Companies House identity verification is a check to confirm that people who set up, run, own or control a Company are who they say they are. It has been introduced to help reduce fraud and improve the accuracy of the Companies House register.',
      },
      {
        q: 'Do sole traders need to verify their identity with Companies House?',
        a: 'No. Sole traders do not need to verify their identity with Companies House.',
      },
      {
        q: 'Who needs to verify their identity with Companies House?',
        a: 'Company directors and People with Significant Control (PSCs) need to verify their identity with Companies House. Identity verification is also being introduced for people who file information at Companies House.',
      },
      {
        q: 'How do I verify my identity with Companies House?',
        a: 'You can verify your identity through GOV.UK One Login.',
      },
      {
        q: 'What documents do I need to verify my identity with Companies House?',
        a: 'If you\'re verifying online, GOV.UK One Login will tell you what information or ID you can use. This can include photo ID such as a passport or UK driving licence, or in some cases bank or building society details.',
      },
      {
        q: 'Can my Accountant verify my identity with Companies House for me?',
        a: 'Not necessarily. Your Accountant can only verify your identity if they\'re registered with Companies House as an Authorised Corporate Service Provider (ACSP). Not all Accountants are registered.',
      },
      {
        q: 'What if I can\'t verify my identity through GOV.UK One Login?',
        a: 'If you can\'t verify your identity online, you may be able to use an Authorised Corporate Service Provider or verify your identity at a participating Post Office.',
      },
      {
        q: 'What is my Companies House personal code and where do I find it?',
        a: 'Your Companies House personal code is the 11-character code you receive after verifying your identity. You can find it in your Companies House account, and Companies House will also email it to you after successful verification.',
        links: [{ label: 'Companies House personal codes', url: 'https://www.gov.uk/guidance/companies-house-personal-codes-for-identity-verification' }],
      },
      {
        q: 'Is my Companies House personal code the same as my Companies House authentication code?',
        a: 'No. Your Companies House personal code belongs to you and is linked to your identity verification. Your authentication code belongs to the Company and is used when filing information for that Company.',
      },
      {
        q: 'I\'m a director or Person with Significant Control (PSC) of more than one company. Do I need to verify my identity more than once?',
        a: 'No. You only need to verify your identity once. You\'ll receive one personal code which you use for each Company role you hold.',
      },
      {
        q: 'What happens if I don\'t verify my identity with Companies House?',
        a: 'If you need to verify your identity and don\'t do it, you won\'t be able to complete certain Companies House filings. For example, a Company cannot file its Confirmation Statement until all its directors have verified their identity. If the Confirmation Statement then becomes overdue, the Company can be fined and ultimately struck off the register. If you need help, get in touch and we\'ll be happy to help.',
      },
    ],
  },
  {
    number: 14,
    slug: 'business-financial-difficulties-hmrc-problems',
    title: 'Business Financial Difficulties & HMRC Problems',
    questions: [
      {
        q: 'My Ltd Company is struggling and can\'t pay its bills. What should I do?',
        a: 'Get advice as soon as possible. There may be options available, but the earlier you deal with the problem, the more options you\'re likely to have. If you need help, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'My Ltd Company can\'t pay its tax bill. What should I do?',
        a: 'There may be options available, so don\'t ignore it. You may be able to agree a payment plan with HMRC to spread what the Company owes. If you need help dealing with HMRC, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What does it mean if my company is insolvent?',
        a: 'A Company is insolvent if it can\'t pay its debts when they\'re due, or if it owes more than the value of everything it owns. It doesn\'t necessarily mean the Company has to close, but you should get professional advice as soon as possible.',
      },
      {
        q: 'What is liquidation?',
        a: 'Liquidation is the process of closing a Company, selling its assets and using the money to pay its debts where possible.',
      },
      {
        q: 'What is a Creditors\' Voluntary Liquidation (CVL)?',
        a: 'A Creditors\' Voluntary Liquidation (CVL) is when the directors decide to close an insolvent Company because it can\'t pay its debts. An insolvency practitioner is appointed to deal with the process.',
      },
      {
        q: 'What is a Company Voluntary Arrangement (CVA)?',
        a: 'A Company Voluntary Arrangement (CVA) is an agreement to repay the Company\'s debts over an agreed period. If the creditors agree, the Company can continue trading.',
      },
      {
        q: 'What is administration?',
        a: 'Administration is when an insolvency practitioner takes control of a Company that\'s in financial difficulty and tries to rescue the Company or get the best result for the people it owes money to.',
      },
      {
        q: 'What is an Official Receiver?',
        a: 'An Official Receiver is someone who works for the Insolvency Service and deals with the early stages of bankruptcies and Companies that have been closed by the court.',
      },
      {
        q: 'Can my Accountant help if my Ltd Company is struggling?',
        a: 'Yes. Your Accountant can help you understand the Company\'s financial situation and look at the options available. If your Company is struggling, get in touch as early as possible and we\'ll be happy to help.',
      },
      {
        q: 'I\'m a sole trader and can\'t pay my debts. What should I do?',
        a: 'Get advice as soon as possible. There are different ways of dealing with debt and the right option will depend on your circumstances. If you need help understanding your finances, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'What is bankruptcy?',
        a: 'Bankruptcy is one way for an individual to deal with debts they can\'t afford to pay. Your assets and finances are reviewed and some of your assets may be used to repay your debts.',
      },
      {
        q: 'What is an Individual Voluntary Arrangement (IVA)?',
        a: 'An Individual Voluntary Arrangement (IVA) is a formal agreement with your creditors to repay your debts over an agreed period. It has to be set up through an insolvency practitioner.',
      },
      {
        q: 'What happens if I can\'t afford to pay my tax bill?',
        a: 'There may be options available, so don\'t ignore it. You may be able to agree a payment plan with HMRC to spread what you owe. If you need help dealing with HMRC, get in touch and we\'ll be happy to help.',
      },
      {
        q: 'How do I appeal an HMRC penalty?',
        a: 'You can appeal an HMRC penalty by following the instructions on the penalty letter or using the appeal form HMRC provides. Some penalties can also be appealed online. You normally need to appeal within 30 days of the penalty being issued. If you need help with an HMRC penalty, get in touch and we\'ll be happy to help.',
      },
    ],
  },
];
