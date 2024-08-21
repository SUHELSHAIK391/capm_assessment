const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Employees } = this.entities;

    this.before('CREATE', 'employee', async (req) => {
        const { salaryAmount, Currency_code } = req.data;
        if (salaryAmount >= 50000  ) {
            req.error(400, 'Employee’s salary must be less than 50000 USD ');
        }
        if(Currency_code !== 'USD')
            {
                req.error(400, 'Employee’s salary currency must be in USD');
        }
        else{
            console.log('Created successfully');
        }
    });
 
    this.after('CREATE', 'employee', async (data, req) => {
        console.log('Create operation successful');
    });
    // this.before('UPDATE', 'employee', async (req) => {
    //     const { nameFirst, loginName } = req.data;
    //     const oldEmployee = await SELECT.one.from(Employees).where({ ID: req.params[0] });
    //     if (oldEmployee.nameFirst !== nameFirst || oldEmployee.loginName !== loginName) {
    //         req.error(400, 'Operation not allowed');
    //     }
    //     const { salaryAmount, currencyCode } = req.data;
    //     if (salaryAmount >= 50000 || currencyCode !== 'USD') {
    //         req.error(400, 'Employee’s salary must be less than 50000 USD');
    //     }
    // });
    this.before('UPDATE','employee', async (req,res) => {
        // only working with currency_code in body
                  if(req.data.loginName){
                    req.error("login name can't change")
                  }
                  else if (req.data.nameFirst){
                    req.error("name first can't change")
                  }
                  else{
                    try {
                        const ID = req.params[0];
                        const data = req.data
                        console.log("Hey Amigo, Your purchase order with id " + req.params[0] + " will be updated");
                        const tx = cds.tx(req);
                        await tx.update(EmployeeSet).with({
                            ...data,
                            "currency_code":"USD"
                        }).where(ID);
                    } catch (error) {
                        return "Error " + error.toString();
                    }
                  }
                 
                  })

    this.after('UPDATE', 'employee', async (data, req) => {
        console.log('Update operation successful');
    });

    this.before('DELETE', 'employee', async (req) => {
        const employee = await SELECT.one.from(Employees).where({ ID: req.params[0] });
        if (employee.nameFirst.startsWith('S')) {
            req.error(400, 'Deletion not allowed for employees whose nameFirst starts with "S"');
        }
    });

    this.after('DELETE', 'employee', async (data, req) => {
        console.log('Delete operation successful');
    });
});
