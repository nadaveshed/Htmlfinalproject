/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	
	function chooseType(){ // Choose what type to add: category or payment method 
		if(document.getElementById("Category").checked == true)
				saveNewCategory();
		else if(document.getElementById("Payment").checked == true)
				saveNewPayment();
	}
	
	function saveNewCategory(){ // Save new category
		var Category = JSON.parse(localStorage.getItem("Category")); // Categories in local storage
		if(Category == null) 
			Category = [];
		var NewCategory = document.getElementById("InputCategoryPayment").value; // Get new category from textbox
		if(NewCategory == "")
		{
			alert("נא הזן קטגוריה!")
			return;
		}
		for(var i = 0; i < Category.length; i++) // Check if the category exist already
		{
			if(NewCategory == Category[i])
			{
				alert("הקטגוריה הנוכחית כבר קיימת!")
				return;
			}
		}
		Category.push(NewCategory); // Add new category to the category list
		localStorage.setItem("Category", JSON.stringify(Category)); // Save in local storage
		clearTextData(); // Clear input field
		alert("הקטגוריה נוספה בהצלחה!");
	}
	
	function saveNewPayment(){ // Save new payment method 
		var Payment = JSON.parse(localStorage.getItem("Payment")); // Payment methods in local storage
		if(Payment == null) 
			Payment = [];
		var NewPayment = document.getElementById("InputCategoryPayment").value; // Get new payment method from textbox
		if(NewPayment == "")
		{
			alert("נא הזן אמצעי תשלום!");
			return;
		}
		for(var i = 0; i < Payment.length; i++) // Check if the payment method exist already
		{
			if(NewPayment == Payment[i])
			{
				alert("אמצעי התשלום הנוכחי כבר קיים!");
				return;
			}
		}
		Payment.push(NewPayment); // Add new payment method to the payment method list
		localStorage.setItem("Payment", JSON.stringify(Payment)); // Save in local storage
		clearTextData(); // Clear input field
		alert("אמצעי התשלום נוסף בהצלחה!");
	}
	
	function clearTextData(){ // Clear input field
		document.getElementById("InputCategoryPayment").value = "";
	}

		
	$("document").ready(function(){ // Choose between category or payment method
						
		$("#AddNewCategoryPaymentButton").click(function(){ // filter the expenses
			chooseType();
		});
	});
	
}());



