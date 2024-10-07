import { environment } from 'src/environments/environment';

export class RestParams {
  dateStart: number;
  dateEnd: number;
  search: string;
  deleted?: boolean;
  pageNumber: number;
  pageSize: number;
  direction: string;
  field: string;

  marketplaceId?: number;
  categoryId?: number;

  filter: any;
  id: number;
  type: string;

  dto?: any;

  static buildDef() {
    let r = new RestParams()
      .setPageNumber(1)
      .setPageSize(20)
      .setDirection('')
      .setField('');
    return r;
  }

  spread(obj) {
    return Object.assign(this, obj);
  }

  private constructor() {}

  public setPageNumber(n: number) {
    this.pageNumber = n;
    return this;
  }

  public setPageSize(n: number) {
    this.pageSize = n;
    return this;
  }

  public setDirection(n: string) {
    this.direction = n;
    return this;
  }

  public setField(n: string) {
    this.field = n;
    return this;
  }

  public setDto() {
    this.dto = {
      deptId: null,
    };
    return this;
  }

  public setFilter(s: string) {
    this.filter = s;
    return this;
  }
  public setPageMarketplaceId(n: number) {
    this.marketplaceId = n;
    return this;
  }
  public setCategoryId(n: number) {
    this.categoryId = n;
    return this;
  }
  public setSearch(search: string) {
    this.search = search;
    return this;
  }
  public setDelete(deleted: boolean) {
    this.deleted = deleted;
    return this;
  }

  public setDate(dateStart: number, dateEnd: number) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    return this;
  }

  buildQuery(api: string): string {
    // /api/item/paging/
    let str = `${environment.api_cloud}/${api}?page=${this.pageNumber}&size=${this.pageSize}`;
    if (this.search && this.search.length) str = str + `&search=${this.search}`;
    if (this.deleted) str = str + `&deleted=false`;
    if (this.dateStart && this.dateEnd)
      str = str + `&datestart=${this.dateStart}&dateEnd=${this.dateEnd}`;
    return str;
  }
}
