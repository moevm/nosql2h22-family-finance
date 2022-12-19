import datetime
import json

import icecream
from bson import json_util, ObjectId
from flask import request, Response

from settings import app
from controller import DbHelper


database_helper = DbHelper()


@app.route('/user', methods=['POST'])
def register_user():
    data = json.loads(request.data)
    database_helper.user_register(user=data)
    return Response(status=200, response=json_util.dumps(data), content_type='application/json')


@app.route('/user/<object_id>', methods=['GET'])
def get_user(object_id):
    response = database_helper.user_retrieve(object_id)
    return Response(status=200, response=json_util.dumps(response), content_type='application/json')


@app.route('/login', methods=['POST'])
def auth_user():
    data = json.loads(request.data)
    response = database_helper.check_user(login=data.get('login'), password=data.get('password'))
    return Response(status=200, response=json_util.dumps(response), content_type='application/json')


@app.route('/balance', methods=['POST'])
def create_balance():
    data = json.loads(request.data)
    bank_account = database_helper.create_balance(user_id=data.get('users'), is_family=data.get('is_family', False))
    return Response(status=200, response=json_util.dumps(bank_account), content_type='application/json')


@app.route('/add_to_family_balance', methods=['POST'])
def add_user_to_family_balance():
    data = json.loads(request.data)
    bank_account = database_helper.add_user_to_family_balance(user_login=data.get('login'),
                                                              family_id=data.get('bank_account_id'))
    return Response(status=200, response=json_util.dumps(bank_account), content_type='application/json')


@app.route('/balance/<object_id>', methods=['GET'])
def get_balances(object_id):
    bank_accounts = database_helper.get_balance_for_user(object_id)
    return Response(status=200, response=json_util.dumps(bank_accounts), content_type='application/json')


@app.route('/transaction', methods=['POST', "GET"])
def create_transaction():
    if request.method == "POST":
        data = json.loads(request.data)
        data['created_at'] = datetime.datetime.now()
        data['created_by'] = ObjectId(data.get("created_by"))
        data['sum'] = data.get('sum')
        data['to_bank_account'] = ObjectId(data.get("to_bank_account"))
        data["created_by_bank_account"] = ObjectId(data.get("created_by_bank_account"))
        transaction = database_helper.create_transaction(transaction=data)
        return Response(status=200, response=json_util.dumps(transaction), content_type='application/json')
    if request.method == 'GET':
        query_params = request.args
        return Response(status=200, response=json_util.dumps(database_helper.list_transactions(**query_params)))


@app.route('/transaction/<object_id>', methods=["GET"])
def detail_transaction(object_id):
    return Response(status=200, response=json_util.dumps(database_helper.get_transaction_by_id(object_id)),
                    content_type="application/json")


@app.route('/users', methods=["GET"])
def get_users():
    return Response(status=200, response=json_util.dumps(database_helper.list_users()))


@app.route('/balances', methods=["GET"])
def get_balances_all():
    return Response(status=200, response=json_util.dumps(database_helper.list_balances()))


@app.route('/transactions', methods=["GET"])
def get_transactions():
    return Response(status=200, response=json_util.dumps(database_helper.all_transactions()))
