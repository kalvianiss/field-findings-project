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
    new Sidebar(
    'Field Findings / Complaint',
    'field-findings',
    'icon-finding',
    ''
    )
];
