using { ust.suhel.shaik.db.datamodel } from '../db/datamodel';
service CatalogService @(path: 'CatalogService')
{

    entity employee as projection on datamodel.employees;

}