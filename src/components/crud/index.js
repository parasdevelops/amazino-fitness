import React from "react";
import startFirebase from "../firebaseConfig";
import {
  ref,
  set,
  get,
  update,
  remove,
  child,
  onValue,
} from "firebase/database";
import "./index.css";
import { Table } from "react-bootstrap";
const mydb = startFirebase();
export class Crud extends React.Component {
  constructor() {
    super();
    this.state = {
      db: "",
      username: "",
      fullname: "",
      phoneNumber: "",
      dob: "",
      tableData: [],
    };
    this.interface = this.interface.bind(this);
  }
  componentDidMount() {
    this.setState({
      db: mydb,
    });
    const dbref = ref(mydb, "Customer");
    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childsnapshot) => {
        let keyname = childsnapshot.key;
        let data = childsnapshot.val();
        records.push({ key: keyname, data: data });
      });
      this.setState({ tableData: records });
    });
  }
  interface(event) {
    const id = event.target.id;
    if (id == "addBtn") this.insertData();
    else if (id == "updateBtn") this.updateData();
    else if (id == "deleteBtn") this.deleteData();
    else if (id == "selectBtn") this.selectData();
  }

  getAllInputs() {
    return {
      username: this.state.username,
      name: this.state.fullname,
      phone: Number(this.state.phoneNumber),
      dob: this.state.dob,
    };
  }

  insertData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    set(ref(db, "Customer/" + data.username), {
      fullname: data.name,
      phoneNumber: data.phone,
      dateofbirth: data.dob,
    })
      .then(() => {
        console.log("data added successfully");
      })
      .catch(() => console.log("Some issue happened"));
  }

  updateData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    update(ref(db, "Customer/" + data.username), {
      fullname: data.name,
      phoneNumber: data.phone,
      dateofbirth: data.dob,
    })
      .then(() => {
        console.log("data added successfully");
      })
      .catch(() => console.log("Some issue happened"));
  }

  deleteData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    remove(ref(db, "Customer/" + data.username))
      .then(() => {
        console.log("data added successfully");
      })
      .catch(() => console.log("Some issue happened"));
  }

  selectData() {
    const dbref = ref(this.state.db);
    const username = this.getAllInputs().username;
    get(child(dbref, "Customer/" + username)).then((snapshot) => {
      if (snapshot.exists()) {
        this.setState({
          fullname: snapshot.val().fullname,
          phoneNumber: snapshot.val().phoneNumber,
          dob: snapshot.val().dateofbirth,
        });
      } else {
        console.log("no data found");
      }
    });
  }

  render() {
    return (
      <>
        <label>Enter username</label>
        <input
          type="text"
          id="userbox"
          value={this.state.username}
          onChange={(e) => {
            this.setState({ username: e.target.value });
          }}
        />
        <br />
        <label for="namebox">Enter Full Name</label>
        <input
          type="text"
          id="namebox"
          value={this.state.fullname}
          onChange={(e) => {
            this.setState({ fullname: e.target.value });
          }}
        />
        <br />
        <label>Enter Phone Number</label>
        <input
          type="number"
          id="phonebox"
          value={this.state.phoneNumber}
          onChange={(e) => {
            this.setState({ phoneNumber: e.target.value });
          }}
        />
        <br />
        <label for="datebox">Choose dob</label>
        <input
          type="date"
          id="datebox"
          value={this.state.dob}
          onChange={(e) => {
            this.setState({ dob: e.target.value });
          }}
        />
        <br />
        <button id="addBtn" onClick={this.interface}>
          {" "}
          Add data{" "}
        </button>
        <button id="updateBtn" onClick={this.interface}>
          Update data
        </button>
        <button id="deleteBtn" onClick={this.interface}>
          Delete data
        </button>
        <button id="selectBtn" onClick={this.interface}>
          Get data from DB
        </button>
        <br />
        <h1>This change needs to go</h1>
        <Table className="container w-75 " bordered striped variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>FullName</th>
              <th>Phone Number</th>
              <th>Date of birth</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((rowdata, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rowdata.key}</td>
                  <td>{rowdata.data.fullname}</td>
                  <td>{rowdata.data.phoneNumber}</td>
                  <td>{rowdata.data.dateofbirth}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}
