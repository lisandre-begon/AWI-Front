import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';

enum statuts{
  depot,
  vente,
  pasEncoreVendu,
}
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  //Model transaction :
    // statut: statuts;
    // gestionnaire: number;
    // proprietaire: number;
    // acheteur: number;
    // date_transaction: Date;
    // remise: number;
    // prix_total: number;
    // frais: number;
    // jeux: number[];

  public transactions : Transaction[] = [
    new Transaction(statuts.depot, 1, 1, 2, new Date(), 0, 30, 0, [1]),
    new Transaction(statuts.vente, 1, 1, 3, new Date(), 0, 10, 0, [2])
  ]

  constructor() { }

  getDepots(): Transaction[] {
    var depots : Transaction[] = [];
    var i : number;
    for (i= 0; i < this.transactions.length; i++){ {
      if (this.transactions[i].statut == statuts.depot){
        depots.push(this.transactions[i]);
      }}
  }
    return depots;}

  getVentes(): Transaction[] {
    var ventes : Transaction[] = [];
    var i : number;
    for (i= 0; i < this.transactions.length; i++){ {
      if (this.transactions[i].statut == statuts.vente){
        ventes.push(this.transactions[i]);
      }}
  }
    return ventes;  
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionById(id: number): Transaction {
    return this.transactions[id];
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
}
