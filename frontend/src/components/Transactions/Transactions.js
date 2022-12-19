import {Component, useState} from "react";
import * as React from 'react';
import reactFamilyFinanceApi from "../../services/api";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      insert_mode: false,
      new_row: {
      }
    }
  }

  async componentDidMount() {
    await this.setState({
      data: await reactFamilyFinanceApi.get_transactions()
    })
  }

  render() {
    const headers = ['_id', 'category', 'created_at', 'created_by', 'name', 'sum', 'type', 'created_by_bank_account', 'to_bank_account']
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'center', margin: '40px', flexDirection: 'column'}}>
          <a href={'/'} className="text-center mb-5">Назад</a>
          <table className="table table-striped table-borderless table-hover text-center">
            <thead className="cf">
            <tr>
              {
                headers.map((header) => {
                  return (
                    <th>{header}</th>
                  )
                })
              }
            </tr>
            </thead>
            <tbody>
            {
              this.state.data.map((transaction) => {
                console.log(transaction)
                return (
                  <tr>
                    <td>{transaction['_id']['$oid']}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.created_at["$date"] ? transaction.created_at["$date"] : transaction.created_at}</td>
                    <td>{transaction.created_by["$oid"]}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.sum}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.created_by_bank_account["$oid"]}</td>
                    <td>{transaction.to_bank_account["$oid"]}</td>
                  </tr>
                )
              })
            }
            <tr hidden={this.state.insert_mode === false}>
              <td/>
              <td>
                <input
                  className="form-control"
                  type="text"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          category: e.target.value
                        }
                      })
                    }
                  }
                />
              </td>
              <td/>
              <td>
                <input
                  required={true}
                  className="form-control"
                  type="text"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          created_by: e.target.value
                        }
                      })
                    }
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  className="form-control"
                  type="text"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          name: e.target.value
                        }
                      })
                    }
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  className="form-control"
                  type="number"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          sum: e.target.value
                        }
                      })
                    }
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  className="form-control"
                  type="text"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          type: e.target.value
                        }
                      })
                    }
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  className="form-control"
                  type="text"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          created_by_bank_account: e.target.value
                        }
                      })
                    }
                  }
                />
              </td>
              <td>
                <input
                  required={true}
                  className="form-control"
                  type="text"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          text: e.target.value
                        }
                      })
                    }
                  }
                />
              </td>
            </tr>
            </tbody>
          </table>
          <button
            hidden={this.state.insert_mode === true}
            className="btn btn-block btn-primary"
            onClick={async () => {
              await this.setState({
                insert_mode: true
              })
            }}
          >
            Добавить
          </button>
          <button
            hidden={this.state.insert_mode === false}
            className="btn btn-block btn-primary"
            onClick={async () => {
              console.log(this.state.new_row)
              await reactFamilyFinanceApi.add_transaction(this.state.new_row)
              window.location.reload()
            }}
          >
            Сохранить
          </button>
        </div>
      </>
    )
  }
}

export default Transactions;