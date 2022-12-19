import {Component, useState} from "react";
import * as React from 'react';
import reactFamilyFinanceApi from "../../services/api";

class Balances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      insert_mode: false,
      new_row: {}
    }
  }

  async componentDidMount() {
    await this.setState({
      data: await reactFamilyFinanceApi.get_balances()
    })
  }

  render() {
    const headers = ['_id', 'balance', 'users', 'is_family']
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
              this.state.data.map((balance) => {
                return (
                  <tr>
                    <td>{balance['_id']['$oid']}</td>
                    <td>{balance.balance['$numberDecimal']}</td>
                    <td>{balance.users.map(user => user['$oid']).toString()}</td>
                    <td>{balance.is_family ? balance.is_family.toString() : ''}</td>
                  </tr>
                )
              })
            }
            <tr hidden={this.state.insert_mode === false}>
              <td/>
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
                          users: e.target.value
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
                  type="checkbox"
                  onChange={
                    async (e) => {
                      await this.setState({
                        new_row: {
                          ...this.state.new_row,
                          is_family: e.target.value === 'on'
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
              await reactFamilyFinanceApi.add_balance(this.state.new_row)
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

export default Balances;