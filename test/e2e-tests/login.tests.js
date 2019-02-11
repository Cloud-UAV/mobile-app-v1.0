describe('Clicking on the login button ', function(){  
    var username, password, loginButton;

    beforeEach(function() {
        browser.get('/#/login');
        username = element(by.model('data.username'));
        password = element(by.model('data.password'));
        loginButton = element(by.buttonText('Login'));
    });

    it('should validate the credentials for a successful login and display the My Dinners view', function() {
        // TODO: test successful login
        username.sendKeys('mariam.dost@sensorup.com');
        password.sendKeys(123456);

        loginButton.click().then(function() {
            expect(browser.getCurrentUrl()).toMatch('/tab/index');
            //expect(browser.getTitle()).toEqual('Login');
            //expect(element(by.model('data.password')).getText()).
            //    toEqual(''); 

            //var dinners = element.all(by.repeater('dinner in vm.dinners'));
            //expect(dinners.count()).toEqual(3);
        });
    })

    it('should display a popup for an unsuccessful login', function() {
        // TODO: test unsuccessful login
        username.sendKeys('mariam.dost@sensorup.com');
        password.sendKeys('idontknow');

        loginButton.click().then(function() {
            //expect(browser.switchTo().alert().accept());
            //expect(browser.getCurrentUrl()).toMatch('/login');

        //    var popup = element(by.css('.popup-container.popup-showing.active'));
        //    expect(popup.isDisplayed()).toBeTruthy();
        });
    });
});

/*

describe('index page', function() {

    beforeEach(function(){
        browser.get('/#/tab/index');
        email = element(by.model('email'));
    });

    it('check user name and email', function(){
        expect(element(by.binding('email')).getText()).
            //toEqual('mariam.dost@sensorup.com'); 
            toEqual('test'); 
    });

});  
*/