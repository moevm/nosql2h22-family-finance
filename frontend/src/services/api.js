import urlJoin from 'url-join';
// eslint-disable-next-line no-unused-vars
import React from "react";

const reactFamilyFinanceApi = {

  base_api_url: 'http://127.0.0.1:5000',

  login: async (login_data) => {
    let options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    options.body = JSON.stringify(login_data)
    let response = await fetch(urlJoin(reactFamilyFinanceApi.base_api_url, `/login`), options);
    response = await response.json()
    if (response){
      console.log(response)
      localStorage.setItem("user_id", response['_id']["$oid"])
    }
    return response;
  },

  get_users: async () => {
    let options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    return (await fetch(urlJoin(reactFamilyFinanceApi.base_api_url, `/users`), options)).json();
  },

  add_user: async (data) => {
    let options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    options.body = JSON.stringify(data)
    return (await fetch(urlJoin(reactFamilyFinanceApi.base_api_url, `/user`), options)).json();
  },

  get_balances: async () => {
    let options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    return (await fetch(urlJoin(reactFamilyFinanceApi.base_api_url, `/balances`), options)).json();
  },

  add_balance: async (data) => {
    let options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    options.body = JSON.stringify(data)
    return (await fetch(urlJoin(reactFamilyFinanceApi.base_api_url, `/balance`), options)).json();
  },

  get_transactions: async () => {
    let options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    return (await fetch(urlJoin(reactFamilyFinanceApi.base_api_url, `/transactions`), options)).json();
  },

  add_transaction: async (data) => {
    let options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    options.body = JSON.stringify(data)
    return (await fetch(urlJoin(reactFamilyFinanceApi.base_api_url, `/transaction`), options)).json();
    }

}

export default reactFamilyFinanceApi;