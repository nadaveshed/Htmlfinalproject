/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	
	function saveExpense(){ // Save the Expnese to local storage
		var itemCount; // The number of the expense in the local storage
		var ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr")); // Get expenses data from local storage
		if(ExpensesArr == null) // If local storage is empty
		{
			itemCount = 0; // Set first item to number 0
			ExpensesArr = [];
		}
		else // If local storage is not empty
		{
			itemCount = arrayMax(ExpensesArr, "number"); // Get the max number of items from local storage 
			itemCount++; // Set the new item to be 1+ of current number of items
		}
		var date = document.getElementById("NewDate").value; // Get date value from input
		// Get category name from input
		var categoryNum = document.getElementById("InputCategory").value; 
		var categoryName = document.getElementById("InputCategory").options[categoryNum].text; 
		// get payment method name from input
		var paymentNum = document.getElementById("InputPayment").value; 
		var paymentName = document.getElementById("InputPayment").options[paymentNum].text; 
		
		var transaction = document.getElementById("NewTransaction").value; // get transaction sum value from input
		var comment = document.getElementById("NewComment").value; // get comment value from input
		if(comment == "") // Set to empty if comment is undefined
			comment = "";
		if(date == "" || categoryName == "" || paymentName == "" || transaction == "") // Only comment input can be empty
		{
			alert("רק שדה הערה יכול להשאר ריק!");
			return;
		}
		if(transaction <= 0) // Transaction sum value must be greater then zero
		{
			alert("סכום עסקה חייב להיות חיובי!");
			return;
		}
		
		var expense = new Object(); // Create a new expense object and add the properties to the object
		expense.number = itemCount;
		expense.date = date;
		expense.categoryName = categoryName;
		expense.paymentName = paymentName;
		expense.transaction = transaction;
		expense.comment = comment;
		ExpensesArr.push(expense); // Save the expense object in the expenses array
		localStorage.setItem("ExpensesArr", JSON.stringify(ExpensesArr)); // Save the array in local storage
		clearTextData(); // Clear all input fields
		
		alert("ההוצאה נוספה בהצלחה!");
	}
	
	function clearTextData(){ // Clear all input fields
		document.getElementById("NewDate").value = ""; 
		document.getElementById("InputCategory").value = "0"; 
		document.getElementById("InputPayment").value = "0"; 
		document.getElementById("NewTransaction").value = ""; 
		document.getElementById("NewComment").value = ""; 
	}
	
	function CategoryPopulate(){ // Populate the categroy drop down list according to saved categries in local storage 
		var k;
		var ChooseCategory = document.getElementById('InputCategory'); // Html drop down select button
		var MyCategory = JSON.parse(localStorage.getItem("Category")); // Get categories from local storage
		if(MyCategory == null) 
		{
			alert("גש להוספת קטגוריה חדשה ולאחר מכן חזור למסך זה!");
			return;
		}
		ChooseCategory.options[ChooseCategory.options.length] = new Option('בחר', 0); // Set first drop down to be "choose"
		for(k = 0; k < MyCategory.length; k++) // Take info from local storage and push to the drop down select button
		{
			ChooseCategory.options[ChooseCategory.options.length] = new Option(MyCategory[k], k+1);
		}
	}	
	
	function PaymentPopulate(){ // Populate the payment method drop down list according to saved payment methods in local storage
		var s;
		var ChoosePayment = document.getElementById('InputPayment'); // Html drop down select button
		var MyPayment = JSON.parse(localStorage.getItem("Payment")); // Get payment methods from local storage
		if(MyPayment == null)
		{
			alert("גש להוספת אמצעי תשלום חדש ולאחר מכן חזור למסך זה!");
			return;
		}
		ChoosePayment.options[ChoosePayment.options.length] = new Option('בחר', 0); // Set first drop down to be "choose"
		for(s = 0; s < MyPayment.length; s++) // Take info from local storage and push to the drop down select button
		{
			ChoosePayment.options[ChoosePayment.options.length] = new Option(MyPayment[s], s+1);
		}
	}
	
	function arrayMax(arr, key){ // Get the number of items from local storage 
		var m = -Infinity, cur, i;
		for(i = 0; i < arr.length; i++)
		{
			cur = arr[i][key];
			if(cur > m)
				m = cur;
		}
		return m;
	}
		
	$("document").ready(function(){
		CategoryPopulate();
		PaymentPopulate();
		$("#AddNewExpenseButton").click(function(){ // Save the expense button
			saveExpense();
		});
	});
	
}());



