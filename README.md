# My Pet Project need just learn Redux like stores
I want to know how to work "redux" and I created "Path Store" for deep dive to Store mechanism.

## Little about project
I call this store 'Path Store' because of specifics use it. If you want get data from store you need set path to property and store, store will do call subscribers functions if property was changes 

## Funny features
- The store will only call subscribers who have subscribed to path properties changes that have been updated.
 - You can call dispatch to many times, but store will do call subscribers once
