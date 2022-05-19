declare module 'unitpricelist.json' {
    interface unitpricelist {
      case_no : string;
      taste : number;
      size : number;
      kakaku : string;
    }
  
    const value: unitpricelist;
    export = value;

}