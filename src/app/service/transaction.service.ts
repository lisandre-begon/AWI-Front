import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';

enum Statuts {
  depot = "depot",
  vente = "vente",
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  // Transactions initiales pour test
  public transactions: Transaction[] = [
    new Transaction('1',Statuts.depot, '1', '1', '2', new Date(), 0, 30, 0, ['1']),
    new Transaction('1',Statuts.vente, '1', '1', '3', new Date(), 5, 35, 2, ['2']),
  ];

  constructor() {}

  // Obtenir toutes les transactions
  getTransactions(): Transaction[] {
    return this.transactions;
  }

  // recuperer les transacotion par id 
  getTransactionById(id: string): Transaction {
    const transaction = this.transactions.find((transaction) => transaction.id === id);
    if (!transaction) {
      throw new Error(`Transaction avec l'ID ${id} non trouvé.`);
    }
    return transaction;
  }

  // Ajouter une nouvelle transaction
  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  // Récupérer toutes les transactions avec le statut "depot"
  getDepots(): Transaction[] {
    return this.transactions.filter((transaction) => transaction.statut === Statuts.depot);
  }

  // Récupérer toutes les transactions avec le statut "vente"
  getVentes(): Transaction[] {
    return this.transactions.filter((transaction) => transaction.statut === Statuts.vente);
  }
}
