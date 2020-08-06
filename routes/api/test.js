//Simulate sending request
function getResponse(url,method,data,fun)
{
    var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            fun(xmlhttp.responseText);
        }
        else
        {
            fun("Error");
        }
	}
	xmlhttp.open(method,url,true);
	xmlhttp.send(data);
}

//Convert JSON string to object
function stringToJson(text)
{
    return JSON.parse(text);
}


//Product information test
function T_products()
{
    var data;
    var fun=function(info){data=info};
    getResponse("/products","POST",NULL,fun);
    console.log(data);
}

//Order test
function T_checkout(phone,products,name,address,latLng,)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.stripeToken=generateCode();
    data.phone=phone;
    data.products=products;
    data.name=name;
    data.address=address;
    data.latLng=latLng;
    getResponse("/checkout","POST",data,fun);
    console.log(res);
}

//Generate random order number
function generateCode() {
	return Math.floor(Math.random() * Math.floor(1000000));
}

//Get order
function T_getOrders()
{
    var data;
    var fun=function(info){data=info};
    getResponse("/getOrders","POST",NULL,fun);
    console.log(data);
}

function T_getPrevious()
{
    var data;
    var fun=function(info){data=info};
    getResponse("/getPrevious","POST",NULL,fun);
    console.log(data);
}

function T_getOngoing()
{
    var data;
    var fun=function(info){data=info};
    getResponse("/getOngoing","POST",NULL,fun);
    console.log(data);
}

function T_acceptOrder(stripeToken,phone)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.stripeToken=stripeToken;
    data.phone=phone;
    getResponse("/acceptOrder","POST",data,fun);
    console.log(res);
}

function T_sms(msg,num)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.msg=msg;
    data.num=num;
    getResponse("/sms","POST",data,fun);
    console.log(res);
}

function T_allUsers()
{
    var res;
    var fun=function(info){res=info};
    getResponse("api/users/allUsers","POST",NULL,fun);
    console.log(res);
}

function T_forgotpw(phone)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.phone=phone;
    getResponse("api/users/forgotpw","POST",data,fun);
    console.log(res);
}

function T_forgotpw2(phone,code,password)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.phone=phone;
    data.code=code;
    data.password=password;
    getResponse("api/users/forgotpw2","POST",data,fun);
    console.log(res);
}

function T_login(phone,password)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.phone=phone;
    data.password=password;
    getResponse("api/users/login","POST",data,fun);
    console.log(res);
}

function T_getOngoing(phone)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.phone=phone;
    getResponse("api/users/getOngoing","POST",data,fun);
    console.log(res);
}

function T_getPrevious(phone)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.phone=phone;
    getResponse("api/users/getPrevious","POST",data,fun);
    console.log(res);
}

function T_register(name,phone,password,password2)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.phone=phone;
    data.name=name;
    data.password=password;
    data.password2=password2;
    getResponse("api/users/register","POST",data,fun);
    console.log(res);
}

function T_register2(code,phone)
{
    var res;
    var fun=function(info){res=info};
    var data=new Object();
    data.phone=phone;
    data.code=code;
    getResponse("api/users/register2","POST",data,fun);
    console.log(res);
}



