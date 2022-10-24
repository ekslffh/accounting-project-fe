// import { Button, Container, Grid, List, Paper, TextField } from "@mui/material";
// import AddDepart from "../components/AddDepart";
// import Department from "../components/Department";
// import { call } from "../service/ApiService";
// import React from "react";
// import Category from "../components/Category";
// import AddCategory from "../components/AddCategory";
// import EnhancedTable from "../components/EnhancedTable";
// import MemberTable from "../components/MemberTable";
// import DenseTable from "../components/DensTable";

// class Details extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             department: { name: props.match.params.name },
//             categories: [],
//             histories: [],
//             members: [],
//          };
//     }
//     componentDidMount() {
//         // item.department = this.state.department;
//         call("/department/categories?name=" + this.props.match.params.name, "GET", null).then(response => {
//             console.log("response: ", response.data);
//             this.setState({ categories: response.data });
//         //  this.setState({ items: response.data });
//         })
//         .catch(err => console.log(err))
//         call("/department/histories?name=" + this.props.match.params.name, "GET", null).then(response => {
//             console.log("d-history: ", response.data)
//             this.setState({ histories: response.data})
//         });
//         call("/department/members?name=" + this.props.match.params.name, "GET", null).then(response => {
//             console.log("d-members: ", response.data);
//             this.setState({ members: response.data})
//         })
//      }
//      add = (item) => {
//         item.department = this.state.department;
//          call("/category", "POST", item).then(response => {
//              this.setState({ categories: response.data })
//          })
//      }
//      delete = (item) => {
//          call("/category", "DELETE", item).then(response => {
//              this.setState({ categories: response.data })
//          })
//      }
//      update = (item) => {
//          call("/category", "PUT", item).then(response => {
//              this.setState({ categories: response.data })
//          })
//      }
//      render() {
//          var categoryItems = this.state.categories.length > 0 && (
//              <Paper style={{ margin: 16 }}>
//                  <List>
//                      {this.state.categories.map((item, idx) => (
//                          <Category item={item} key={item.id} delete={this.delete} update={this.update} />
//                      ))}
//                  </List>
//              </Paper>
//          )
//          return (
//              <div>
//                  <Container maxWidth="md">
//                      <AddCategory add={this.add}/>
//                      <div className="categoryList">{categoryItems}</div>
//                  </Container>
//                  <MemberTable members={this.state.members} />
//                  <DenseTable histories={this.state.histories}/>
//              </div>
//          );
//     }
// }

// export default Details;

// // export default function Details(props) {
// //     const name = props.match.params.name;
// //     console.log(props);
// //     console.log(name);
// //     return  ((name !== undefined) ? 
// //     <div>{name} 부서 Details Page입니다.</div> 
// //     : 
// //     <div>땡</div>);
// // }