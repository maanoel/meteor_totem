/*
Parte de código isomórfico
*/

Chamadas = new Mongo.Collection('chamadas');
Pass = new Mongo.Collection("pass");
Retirada = new Mongo.Collection("retirada");

ChamadasReactive = new ReactiveVar(0);
