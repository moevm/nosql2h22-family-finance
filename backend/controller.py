from bson import ObjectId, Decimal128

from settings import db


class DbHelper:

    def __init__(self):
        self.db = db
        self.user = db.user
        self.family = db.family
        self.transaction = db.transaction

    def user_register(self, *args, **kwargs):
        user = kwargs.get('user')
        return self.user.insert_one(user)

    def user_retrieve(self, pk, *args, **kwargs):
        return self.user.find_one({"_id": ObjectId(pk)})

    def check_user(self, login, password):
        return self.user.find_one({
            "login": login,
            "password": password
        })

    def create_balance(self, user_id, is_family):
        balance_id = self.family.insert_one({
            "balance": Decimal128(str(0)),
            "users": [ObjectId(user_id)],
            "is_family": is_family
        }).inserted_id
        return db.family.find_one({
            "_id": ObjectId(balance_id)
        })

    def add_user_to_family_balance(self, user_login, family_id):
        user_id = self.user.find_one({"login": user_login}).get("_id")
        self.family.update_one({"_id": ObjectId(family_id)}, {"$push": {"users": ObjectId(user_id)}})
        return db.family.find_one({
            "_id": ObjectId(family_id)
        })

    def get_balance_for_user(self, user_id):
        bank_accounts = self.family.find({
            "users": ObjectId(user_id),
        })
        return [bank_account for bank_account in bank_accounts]

    def get_balance_by_id(self, bank_account_id):
        return self.family.find_one({
            "_id": ObjectId(bank_account_id)
        })

    def create_transaction(self, *args, **kwargs):
        transaction = kwargs.get('transaction')
        if self.update_balance(transaction['created_by_bank_account'], transaction['to_bank_account'], transaction['sum']):
            transaction_id = self.transaction.insert_one(kwargs.get('transaction')).inserted_id
            return self.transaction.find_one({
                "_id": ObjectId(transaction_id)
            })
        return dict(transaction=False)

    def update_balance(self, bank_account_from, bank_account_to, summ):
        if bank_account_from == bank_account_from:
            self.family.update_one({
                "_id": ObjectId(bank_account_to)
            }, {
                "$inc": {"balance": Decimal128(summ)}
            })
            return True
        if Decimal128(self.get_balance_by_id(bank_account_from).get("balance")) >= Decimal128(summ):
            self.family.update_one({
                "_id": ObjectId(bank_account_from)
            }, {
                "$inc": {"balance": Decimal128(-summ)}
            })
            self.family.update_one({
                "_id": ObjectId(bank_account_to)
            }, {
                "$inc": {"balance": Decimal128(summ)}
            })
            return True
        return False

    def list_transactions(self, user_id,
                          date_from=None,
                          date_to=None,
                          user_filter=None,
                          category_filter=None,
                          search_filter=None):
        family = self.get_balance_for_user(user_id)
        query = dict()

        if user_filter:
            query["created_by"] = ObjectId(user_filter)
        else:
            query["created_by"] = {"$in": family.get("users")}

        query["created_at"] = dict()
        if date_from:
            query["created_at"]["$gte"] = date_from

        if date_to:
            query["created_at"]["$lte"] = date_to

        if category_filter:
            query["category"] = category_filter

        if search_filter:
            query["name"] = {"$regex": search_filter}

        if len(query['created_at']) == 0:
            del query['created_at']


        transactions = self.transaction.find(query)
        return [transaction for transaction in transactions]

    def get_transaction_by_id(self, transaction_id):
        return self.transaction.find_one({
            "_id": ObjectId(transaction_id)
        })

    def list_users(self):
        return [user for user in self.user.find({})]

    def list_balances(self):
        return [balance for balance in self.family.find({})]

    def all_transactions(self):
        return [transaction for transaction in self.transaction.find({})]

