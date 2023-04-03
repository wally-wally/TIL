const database = {
  find: (to: string) => { return 12345 },
  updateOne: (accountId: number, v: any) => {} 
}

// bad
function accountDeposit(to: string, amount: number) {
  let accountId = database.find(to);
  database.updateOne(accountId, { $inc: { balance: amount } });
}

function accountTransfer(amount: number, from: string, to: string) {
  accountDeposit(from, -amount);
  accountDeposit(to, amount);
}

// good
class Account {
  private deposit(to: string, amount: number) {
    let accountId = database.find(to);
    database.updateOne(accountId, { $inc: { balance: amount } });
  }

  transfer(amount: number, from: string, to: string) {
    this.deposit(from, -amount);
    this.deposit(to, amount);
  }
}