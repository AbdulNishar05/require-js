define(['knockout','jquery'],function(ko,$)
{
var CalculatorViewModel = function () {
  this.calculatorDisplay = ko.observable("");
  this.updateCalculatorDisplay = function (value) {
    var res = this.calculatorDisplay().toString();
    var temp_res;
    if (value == '+' || value == '-' || value == '*' || value == '/' || value == '%') {
      if (res[(res.length) - 1] == '+' || res[(res.length) - 1] == '-' || res[(res.length) - 1] == '*' || res[(res.length) - 1] == '/' || res[(res.length) - 1] == '%') {
        temp_res = res.substring(0, (res.length) - 1);
        this.calculatorDisplay(temp_res + value);
      }
      else
        this.calculatorDisplay(this.calculatorDisplay() + value);
    }
    else
      this.calculatorDisplay(this.calculatorDisplay() + value);
  };
  
  this.clearDisplay = function () {
    this.calculatorDisplay("");
  }

  this.backspace = function () {
    if (this.calculatorDisplay().length) {
      this.calculatorDisplay(this.calculatorDisplay().substring(0, this.calculatorDisplay().length - 1));
    }
  }

  this.evaluateDisplay = function () {
    this.calculatorDisplay(eval(this.calculatorDisplay()).toString());
  }
}
$(document).ready(function () {
  $("#input").keypress(function (e) {
    var keyCode = e.which;
    if ((keyCode < 47 || keyCode > 58)) {
      return false;
    }
  });

});

ko.applyBindings(new CalculatorViewModel());
})
