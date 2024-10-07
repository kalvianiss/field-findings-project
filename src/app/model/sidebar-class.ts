export class Sidebar {
  urlArr: string[] = [];
  nameArr: string[] = [];
  childList: string[] = [];
  skipBreadCrumb: boolean = false;
  mainParent: boolean = false;
  indent = 0;
  OpenMenu: boolean = true;
  constructor(
    public name: string,
    public url: string,
    public icon?: string,
    public roleName?: string,
    public child?: Sidebar[]
  ) {}

  hasChild() {
    return this.child !== undefined && this.child.length > 0;
  }

  isContent(val): boolean {
    let returnVal = this.roleName === undefined ? false : this.roleName === val;
    if (!returnVal) {
      for (let i = 0; i < this.child?.length; i++) {
        returnVal = this.child[i].isContent(val);
        if (returnVal) {
          break;
        }
      }
    }
    return returnVal;
  }
}

export function FIND_SIDEBAR(arr: Sidebar[], u: string): Sidebar {
  let found;
  for (let c = 0; c < arr.length; c++) {
    if (found) break;
    if (arr[c]?.url === u) found = arr[c];
    if (arr[c]?.child && !found) found = FIND_SIDEBAR(arr[c].child, u);
  }
  return found;
}

export const LIST_SIDEBAR = [
  // new Sidebar('Overview', 'overview', 'home', 'OVERVIEW'),
  // new Sidebar('Finance', 'finance', 'finance', '', [
  //   new Sidebar('Invoice', 'finance-invoice', '', 'INVOICE'),
  //   new Sidebar('Payment', 'finance-payment', '', 'TAGIHAN_PAYMENT'),
  //   new Sidebar('Discount', 'finance-discount', '', 'DISCOUNT'),
  //   new Sidebar(
  //     'Cancel Denda',
  //     'finance-cancel-denda-report',
  //     '',
  //     'CANCEL_DENDA'
  //   ),
  //   new Sidebar('Overtime', 'overtime', '', 'OVERTIME'),
  //   new Sidebar('Deposit', 'deposit', '', '', [
  //     new Sidebar('Deposit History', 'deposit-history', '', 'DEPOSIT'),
  //     new Sidebar(
  //       'Deposit Fitting Out',
  //       'deposit-fitting-out',
  //       '',
  //       'DEPOSIT_FITTING_OUT'
  //     ),
  //     new Sidebar(
  //       'Undefined Deposit',
  //       'undefined-deposit',
  //       '',
  //       'UNDEFINED_DEPOSIT'
  //     ),
  //   ]),
  //   new Sidebar(
  //     'Accounting System',
  //     'account-systems',
  //     '',
  //     'ACCOUNTING_SETTING'
  //   ),
  //   new Sidebar(
  //     'Accounting Thread',
  //     'accounting-thread',
  //     '',
  //     'ACCOUNTING_THREAD'
  //   ),
  //   new Sidebar(
  //     'Recap Account Receivable',
  //     'recap-ar',
  //     '',
  //     'RECAP_ACCOUNT_RECEIVABLE'
  //   ),
  //   new Sidebar(
  //     'Collection Aging',
  //     'finance-collection',
  //     '',
  //     'FINANCE_COLLECTION'
  //   ),
  //   new Sidebar(
  //     'Recap Payment',
  //     'recap-payment',
  //     '',
  //     'RECAP_PAYMENT'
  //   ),
  //   new Sidebar('Account Payable', 'account-payable', ''),
  //   new Sidebar('Generate Invoice', 'generate-invoice', '', 'GENERATE_INVOICE'),
  //   new Sidebar('Operating Cost', 'operating-cost', '', 'OPERATING_COST'),
  //   new Sidebar('Setting', 'setting', '', '', [
  //     new Sidebar('Invoice Settings', 'invoice-setting', '', 'INVOICE_SETTING'),
  //   ]),

  //   // new Sidebar('Documents', 'document', ''),
  //   // new Sidebar('Setting', 'setting', '', [
  //   //   new Sidebar('Invoice', 'invoice_setting', 'right-arrow'),
  //   //   new Sidebar('Overtime', 'overtime_setting', 'right-arrow'),
  //   //   new Sidebar('Utility Code', 'utility_code', 'right-arrow'),
  //   //   new Sidebar('Letter Code', 'letter_code', 'right-arrow'),
  //   // ]),
  // ]),

  // new Sidebar(
  //   'Accounting',
  //   'accounting-system',
  //   'account-system',
  //   'ACCOUNTINT_SYSTEM',
  //   [
  //     new Sidebar('Jurnal', 'jurnal', '', '', [
  //       new Sidebar('Jurnal Entry', 'jurnal-entry', '', 'ACC_JURNAL_ENTRY'),
  //       new Sidebar('Jurnal Template', 'jurnal-template'),
  //     ]),
  //     new Sidebar('Report', 'report-account-system', '', '', [
  //       new Sidebar('Balance Sheet', 'report-balance-sheet'),
  //       new Sidebar('Profit Lost', 'profit-lost', '', ''),
  //       new Sidebar('Profit Lost Monthly', 'profit-lost-month-to-month', '', ''),
  //       new Sidebar('General Ledger', 'report-general-ledger'),
  //       new Sidebar('Trial Balance', 'report-trial-balance'),
  //       // new Sidebar('Cashflow', 'ho-cashflow'),
  //       new Sidebar('Direct Cashflow', 'direct-cashflow'),
  //       // new Sidebar('Indirect Cashflow II', 'ho-indirect-cashflowII'),
  //       new Sidebar('Indirect Cashflow Monthly', 'indirect-cashflow-monthly'),
  //       new Sidebar('Fixed Assets', 'fixed-assets'),
  //     ]),
  //     new Sidebar('Depreciation', 'depreciation'),
  //     new Sidebar('Amortisasi', 'amortisasi', '', 'ACC_AMORTISASI'),
  //     new Sidebar('Setting', 'setting-account-system', '', '', [
  //       new Sidebar('Chart of Account', 'chart-of-account'),
  //       new Sidebar('Jurnal Type', 'jurnal-type', '', 'ACC_JURNAL_TYPE'),
  //       new Sidebar('Cashflow Group', 'cashflow-group'),
  //       new Sidebar('Cashflow Mapping', 'cashflow-mapping'),
  //       new Sidebar('Beginning Balance', 'report-beginning-balance'),
  //       // new Sidebar('Account Type', 'account-type'),
  //       new Sidebar('Periode', 'periode'),
  //       new Sidebar('Accounting Setting', 'accounting-setting'),
  //       new Sidebar('General Setting', 'general-setting'),
  //     ]),
  //   ]
  // ),

  // new Sidebar('HRD', 'hrd', 'hrd', '', [
  //   new Sidebar('Dashboard', 'dashboard-hrd', '', 'HRD'),
  //   new Sidebar('Schedule', 'schedule-list', '', 'HR_SCHEDULE'),
  //   new Sidebar('Attendance', 'attendance', '', '', [
  //     new Sidebar('Daily Attendance', 'daily-attendance', '', 'ATTENDANCE'),
  //     new Sidebar('Leave, Permit, Overtime', 'leave-permit-overtime', '', '', [
  //       new Sidebar(
  //         'Request Approval',
  //         'request-approval',
  //         '',
  //         'REQUEST_APPROVAL'
  //       ),
  //       new Sidebar('Approved Data', 'approval-data', '', 'APPROVAL_DATA'),
  //     ]),
  //     new Sidebar('Report', 'attendance-report', '', 'ATTENDANCE_REPORT'),
  //   ]),
  //   new Sidebar('Payroll', 'payroll', '', '', [
  //     // new Sidebar('Payroll Employee', 'payroll-employee', '', 'PAYROL'),
  //     new Sidebar('Report', 'payroll-data', '', 'PAYROL_REPORT'),
  //     // new Sidebar('Count Payroll', 'count-payroll'),
  //   ]),
  //   new Sidebar('Reimbursement', 'reimbursement', '', '', [
  //     new Sidebar(
  //       'History',
  //       'reimbursement-history',
  //       '',
  //       'REIMBURSEMENT_HISTORY'
  //     ),
  //     new Sidebar(
  //       'Settings',
  //       'reimbursement-settings',
  //       '',
  //       'REIMBURSEMENT_SETTINGS'
  //     ),
  //   ]),

  //   // new Sidebar('Employee', 'employee', '', '', [
  //   //   new Sidebar('Data Employee', 'data-employee', '', 'DATA_EMPLOYEE'),
  //   //   // new Sidebar('Recruitment', 'recruitment'),
  //   // ]),

  //   new Sidebar('Settings', 'attendance-setting', '', '', [
  //     new Sidebar(
  //       'Master Settings',
  //       'attendance-master',
  //       '',
  //       'HRD_MASTER_SETTING'
  //     ),
  //     new Sidebar(
  //       'User Settings',
  //       'users-master-setting',
  //       '',
  //       'HRD_USER_SETTING'
  //     ),
  //     // new Sidebar('Employee Settings', 'employee-payroll-setting', ''),
  //     new Sidebar(
  //       'General Settings',
  //       'hrd-general-setting',
  //       '',
  //       'HRD_GENERAL_SETTING'
  //     ),
  //   ]),
  //   new Sidebar('Import & Export', 'import-export-hrd', '', '', [
  //     new Sidebar(
  //       'Import Absence Schedule',
  //       'import-absence-schedule',
  //       '',
  //       'IMPORT_ABSENCE_SCHEDULE'
  //     ),
  //     new Sidebar(
  //       'Import Attendance',
  //       'import-attendance',
  //       '',
  //       'IMPORT_ATTENDANCE'
  //     ),
  //   ]),
  // ]),
  // new Sidebar(
  //   'Building Maintenance',
  //   'building-maintenance',
  //   'building-maintenance',
  //   '',
  //   [
  //     new Sidebar('Dashboard', 'patrol-dashboard', '', 'PATROL_DASHBOARD'),
  //     new Sidebar('Work Activity', 'user-activity', '', 'USER_ACTIVITY'),
  //     // new Sidebar('Report', 'bm-report', ''),
  //     new Sidebar('Shift', 'bm-shift', '', 'SHIFT'),
  //     new Sidebar('Schedule', 'bm-schedule', '', 'SCHEDULE'),
  //     new Sidebar('Vendor Setting', 'bm-vendor', '', 'BUILDING_VENDOR'),
  //     new Sidebar('Building Asset', 'building-asset', '', 'BUILDING_ASSET'),
  //     new Sidebar('Parking', 'parking', '', 'PARKING'),

  //     new Sidebar('Report', 'report-bm-master', '', '', [
  //       new Sidebar('Daily Report', 'daily-recap', '', 'DAILY_REPORT'),
  //       new Sidebar('Monthly Report', 'daily-report', '', 'MONTHLY_REPORT'),
  //       new Sidebar(
  //         'Location Graph Report',
  //         'location-graph-report',
  //         '',
  //         'LOCATION_GRAPH_REPORT'
  //       ),
  //       new Sidebar(
  //         'Checklist Report',
  //         'bm-report-checklist',
  //         '',
  //         'CHECKLIST_REPORT'
  //       ),
  //       new Sidebar(
  //         'Checklist Table Report',
  //         'report-checklist-table',
  //         '',
  //         'CHECKLIST_TABLE_REPORT'
  //       ),
  //       new Sidebar('Officers', 'detail-patrol-dashboard', '', 'OFFICER'),
  //       new Sidebar(
  //         'Performance Evaluation Report',
  //         'evaluation-perfomance-report',
  //         '',
  //         'PERFORMANCE_EVALUATION_REPORT'
  //       ),
  //       new Sidebar(
  //         'WBP & LWBP Report',
  //         'lbp-lwbp-report',
  //         '',
  //         'WBP_LWBP_REPORT'
  //       ),
  //       new Sidebar('LVMDP Report', 'lvmdp-report', '', 'LVMDP_REPORT'),
  //       new Sidebar('PAM Report', 'pam-report', '', 'PAM_REPORT'),
  //     ]),
  //     new Sidebar(
  //       'Upload Shift Score',
  //       'upload-shift-score',
  //       '',
  //       'UPLOAD_SHIFT_SCORE'
  //     ),
  //     new Sidebar(
  //       'Upload Report Checklist',
  //       'bm-report-checklist-upload',
  //       '',
  //       'UPLOAD_REPORT_CHECKLIST'
  //     ),
  //     // new Sidebar('Settings', 'bm-settings', ''),
  //   ]
  // ),
  // new Sidebar('Location', 'location', 'location', '', [
  //   new Sidebar('Floor', 'floor', '', 'FLOOR_BUILDING'),
  //   new Sidebar('Location', 'location-list', '', 'LOCATION'),
  //   new Sidebar('Checklist', 'checklist', '', 'CHECKLIST'),
  //   new Sidebar('Checklist Group', 'checklist-group', '', 'CHECKLIST_GROUP'),
  // ]),
  // new Sidebar('Receptionist', 'resepsionis', 'receptionist', [
  //   new Sidebar('Report Receptionist', 'report_receptionis', ''),
  //   new Sidebar('Form Guest In', 'form_quest_in', ''),
  //   new Sidebar('Setting', 'setting', '', [
  //     new Sidebar('Necessary Guest', 'necessary_guest', 'right-arrow'),
  //     new Sidebar('Form Guest', 'form_guest', 'right-arrow'),
  //     new Sidebar('Print QR Code', 'print_qrcode', 'right-arrow'),
  //   ]),
  // ]),
    new Sidebar(
    'Field Findings / Complaint',
    'field-findings',
    'icon-finding',
    ''
    )
  // new Sidebar(
  //   'Field Findings / Complaint',
  //   'field-findings',
  //   'icon-finding',
  //   '',
  //   [
  //     new Sidebar(
  //       'Dashboard',
  //       'field-finding-dashboard',
  //       '',
  //       'DASHBOARD_COMPLAINT'
  //     ),
  //     new Sidebar(
  //       'Field Findings',
  //       'field-findings-paging',
  //       '',
  //       'FIELD_FINDING'
  //     ),
  //     new Sidebar(
  //       'Sub Category Complaint',
  //       'subcategory-complaint',
  //       '',
  //       'COMPLAINT_SUB_CATEGORY"'
  //     ),
  //     new Sidebar('Item Complaint', 'item-complaint', '', 'INQUIRY_ITEM'),
  //     new Sidebar('Tenant Complaint', 'tenant-complaint', '', 'COMPLAINT'),
  //   ]
  // ),

  // new Sidebar('Inventory', 'inventory', 'inventory', '', [
  //   new Sidebar('Inventory', 'inventory-item', '', 'INVENTORY'),
  //   new Sidebar('Brand', 'brand', '', 'BRAND'),
  //   new Sidebar('Category', 'category', '', 'CATEGORY'),
  //   new Sidebar('Supplier', 'supplier', '', 'SUPPLIER'),
  //   new Sidebar('Work Purchase Request', 'work_purchase_request', '', 'WPR'),
  // ]),

  // new Sidebar('Tenant', 'tenant', 'tenant', 'TENANT', [
  //   new Sidebar('Tenant News', 'tenant-news', '', 'TENANT_NEWS'),
  //   new Sidebar('Tenant Office', 'tenant-office', '', 'TENANT_OFFICE'),
  //   new Sidebar('Unit List', 'unit-list', '', 'UNIT'),
  //   new Sidebar('Meter Pool', 'meter-pool-list', '', 'METER_POOL'),
  //   new Sidebar('Request Connect', 'request-connect', '', 'CONNECT_REQUEST'),
  //   new Sidebar('Tenant List', 'tenant-list', '', 'TENANT'),
  //   new Sidebar('Utility Tenant', 'utility-tenant', '', 'UTILITY_TENANT'),
  //   new Sidebar('Package', 'tenant-package', '', 'TENANT_PACKET'),
  // ]),
  // new Sidebar(
  //   'Building Services',
  //   'building-services',
  //   'building-services',
  //   '',
  //   [
  //     new Sidebar('Fitting Out', 'fitting-out', '', 'FITTING_OUT'),
  //     new Sidebar('In and Out', 'in-out', '', 'FITTING_IN_OUT'),
  //     new Sidebar('Facility Booking', 'facility-booking', '', '', [
  //       new Sidebar('History', 'facility-history', ''),
  //       new Sidebar('Settings', 'facility-settings', ''),
  //     ]),
  //     new Sidebar('Panic Button', 'panic-button', '', 'panic-button'),
  //     new Sidebar(
  //       'General Setting',
  //       'general-setting-fo',
  //       '',
  //       'GENERAL_SETTING'
  //     ),
  //   ]
  // ),
  // new Sidebar('Receiptionist', 'receiptionist', 'receptionist', 'RECEPTIONIST'),
  // new Sidebar('Management', 'management', 'management', '', [
  //   new Sidebar('Licensing & Contracts', 'licensing-contract', '', 'CONTRACT'),
  //   new Sidebar(
  //     'Announcement',
  //     'announcement',
  //     '',
  //     'ANNOUNCEMENT'
  //   ),
  //   new Sidebar('Company Profile', 'company-profile', '', 'COMPANY_PROFILE'),
  //   new Sidebar('Users', 'users', '', 'USER'),
  //   new Sidebar(
  //     'General Setting',
  //     'management-setting',
  //     '',
  //     'MANAGEMENT_SETTING'
  //   ),
  //   new Sidebar('PAM Report Setting', 'pam-setting', '', 'PAM_SETTING'),
  //   new Sidebar('Bill Setting', 'bill-setting', '', 'BILL_SETTING'),
  //   new Sidebar('LVMDP Setting', 'lvmdp-setting', '', 'LVMDP_SETTING'),
  //   new Sidebar('WBP & LWBP Setting', 'lbp-lwbp-setting', '', 'WBP_SETTING'),
  //   new Sidebar('Roles', 'roles', '', 'ROLES'),
  // ]),
];
