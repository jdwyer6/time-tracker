import albert from '../images/demo-employees/albert.jpg';
import bill from '../images/demo-employees/bill.webp';
import elon from '../images/demo-employees/elon.jpg';
import jeff from '../images/demo-employees/jeff.jpg';
import mark from '../images/demo-employees/mark.webp';
import tony from '../images/demo-employees/tony.jpg';
import ava from '../images/demo-employees/ava.png';
import richard from '../images/demo-employees/richard.webp';
import steve from '../images/demo-employees/steve.jpg';

export const demoUser =
{
  "_id": {
    "$oid": "12345"
  },
  "username": "demo",
  "password": "demo",
  "businessName": "Mike's Bikes",
  "employees": [
    {
      "employeeId": "1",
      "name": "Bill",
      "pin": "1234",
      "img":[
        "images/demo-employees/bill.webp"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf725384db3"
      }
    },
    {
      "employeeId": "2",
      "name": "Elon",
      "pin": "1234",
      "img": [
        "images/demo-employees/elon.jpg"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf725384db4"
      }
    },
    {
      "employeeId": "3",
      "name": "Jeff",
      "pin": "1234",
      "img": [
        "images/demo-employees/jeff.jpg"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf725384db5"
      }
    },
    {
      "employeeId": "4",
      "name": "Mark",
      "pin": "1234",
      "img": [
        "images/demo-employees/mark.webp"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf725384db6"
      }
    },
    {
      "employeeId": "5",
      "name": "Tony",
      "pin": "1234",
      "img": [
        "images/demo-employees/tony.jpg"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf725384db7"
      }
    },
    {
      "employeeId": "6",
      "name": "Ava",
      "pin": "1234",
      "img": [
        "images/demo-employees/ava.png"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf725384db8"
      }
    },
    {
      "employeeId": "7",
      "name": "Richard",
      "pin": "1234",
      "img": [
        "images/demo-employees/richard.webp"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf726384db2"
      }
    },
    {
      "employeeId": "8",
      "name": "Steve",
      "pin": "1234",
      "img": [
        "images/demo-employees/steve.jpg"
      ],
      "work": [],
      "_id": {
        "$oid": "635bce00b1285bf725384db9"
      }
    }
  ],
  "createdAt": {
    "$date": {
      "$numberLong": "1666912894274"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1666959159808"
    }
  },
  "__v": 8
}

