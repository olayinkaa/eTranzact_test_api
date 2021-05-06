const Example = require('../bins/example')

describe('Testing javascript data type',()=>{
   it('Tesing Array',()=>{
       const result = Example.getProducts()
       expect(result).toEqual(expect.arrayContaining(['Bag']))
   })

   it('Testing String',()=>{
       const result = Example.getMessage("Yinka");
       expect(result).toContain("My name");
   })

})