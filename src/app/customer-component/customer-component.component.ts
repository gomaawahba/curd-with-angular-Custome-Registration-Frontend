import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.css']
})
export class CustomerComponentComponent {

  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;


  customername: string ="";
  customeraddress: string ="";
  mobile: Number =0;

  currentCustomerID = "";
  constructor(private http: HttpClient )
  {
    this.getAllCustomer();

  }


  getAllCustomer()
  {

    this.http.get("http://localhost:8080/api/getcustomers")

      .subscribe((resultData: any)=>
      {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
      });
  }

  register()
  {

    let bodyData = {
      "customername" : this.customername,
      "customeraddress" : this.customeraddress,
      "mobile" : this.mobile
    };

    this.http.post("http://localhost:8080/api/save",bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Employee Registered Successfully")
      this.getAllCustomer();
      this.customername = '';
      this.customeraddress = '';
      this.mobile  = 0;
    });
  }

  setUpdate(data: any)
  {
    this.customername = data.customername;
    this.customeraddress = data.customeraddress;
    this.mobile = data.mobile;
    this.currentCustomerID = data.customerid ;
  }

  UpdateRecords()
  {
    let bodyData = {
      "customername" : this.customername,
      "customeraddress" : this.customeraddress,
      "mobile" : this.mobile,
    };

    this.http.put("http://localhost:8080/api/updata"+ "/"+ this.currentCustomerID,bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Employee Registered Updateddd")
      this.getAllCustomer();
      this.customername = '';
      this.customeraddress = '';
      this.mobile  = 0;
    });
  }




  save()
  {
    if(this.currentCustomerID == '')
    {
      this.register();
    }
    else
    {
      this.UpdateRecords();
    }

  }
  setDelete(data: any)
  {


    this.http.delete("http://localhost:8080/api/deletecustomer"+ "/"+ data.id).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Employee Deletedddd")
      this.getAllCustomer();
      this.customername = '';
      this.customeraddress = '';
      this.mobile  = 0;

    });

  }


}



