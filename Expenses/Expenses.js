/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	var ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr")); // Get current expenses from local storage
	var sortDate = 0; // Sorting date ascending/descending variable
	var sortCategory = 0; // Sorting category ascending/descending variable
	var sortPayment = 0; // Sorting payment ascending/descending variable
	var sortTransaction = 0; // Sorting transaction ascending/descending variable
	var itemChosen = 0; // If a certain filter has been applied remember that filter when using other filters
	
	if(ExpensesArr == null) // No expenses found in local storage
	{
		alert("אין הוצאות כלל נא הוסף הוצאה חדשה במסך המתאים!");
		return;
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
	
	function DateSort(){ // Sorting dates ascending/descending
		if(sortDate == 0)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting dates ascending
				if(a.date > b.date) 
					return -1
				else if (a.date < b.date)
					return 1 
				else  
					return 0
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortDate = 1;
		}
		else if(sortDate == 1)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting dates descending
				if(a.date > b.date) 
					return 1
				else if (a.date < b.date)
					return -1 
				else  
					return 0
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortDate = 0;
		}
	}
	
	function CategorySort(){ // Sorting categories ascending/descending
		if(sortCategory == 0)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting categories ascending 
				if(a.categoryName > b.categoryName) 
					return -1
				else if (a.categoryName < b.categoryName)
					return 1 
				else  
					return 0
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortCategory = 1;
		}
		else if(sortCategory == 1)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting categories descending
				if(a.categoryName > b.categoryName) 
					return 1
				else if (a.categoryName < b.categoryName)
					return -1 
				else  
					return 0
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortCategory = 0;
		}
	}
	
	function PaymentSort(){ // Sorting payment methods ascending/descending
		if(sortPayment == 0)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting payment methods ascending
				if(a.paymentName > b.paymentName) 
					return -1
				else if (a.paymentName < b.paymentName)
					return 1 
				else  
					return 0
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortPayment = 1;
		}
		else if(sortPayment == 1)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting payment methods descending
				if(a.paymentName > b.paymentName) 
					return 1
				else if (a.paymentName < b.paymentName)
					return -1 
				else  
					return 0
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortPayment = 0;
		}
	}
	
	function TransactionSort(){ // Sorting transactions ascending/descending
		if(sortTransaction == 0)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting transactions ascending
				return a.transaction - b.transaction;
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortTransaction = 1;
		}
		else if(sortTransaction == 1)
		{
			SearchResults = ExpensesArr.sort(function(a, b){ // Sorting transactions descending
				return b.transaction - a.transaction;				
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortTransaction = 0;
		}
	}
			
	function Filter(){ // Filter button - filter by all chosen properties
		var start = document.getElementById("InputDateStart").value;
		var end = document.getElementById("InputDateEnd").value;
		
		if(start != "" && end == "") // Only start date was entered
		{
			alert("נא הכנס תאריך יעד!");
			return;
		}
		else if(start == "" && end != "") // Only end date was entered
		{
			alert("נא הכנס תאריך התחלה!");
			return;
		}
		else if(start != "" && end != "") // Filter according to given dates
		{
			if(itemChosen == 0) // If table haven't been filterd before
			{
				SearchResults = ExpensesArr.filter(function (el) {
					return el.date >= start && el.date <= end;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}	
			else // If table have been filterd before
			{
				SearchResults = SearchResults.filter(function (el) {
					return el.date >= start && el.date <= end;
				});
				ShowExpense(SearchResults);
			}
		}
		
		if(document.getElementById("InputCategory").value != 0) // Filter according to a certain category - if one was chosen
		{
			if(itemChosen == 0) // If table haven't been filterd before
			{
				SearchResults = ExpensesArr.filter(function (el) {
				return 	el.categoryName == document.getElementById("InputCategory").options[document.getElementById("InputCategory").value].text;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}
			else // If table have been filterd before
			{
				SearchResults = SearchResults.filter(function (el) {
				return 	el.categoryName == document.getElementById("InputCategory").options[document.getElementById("InputCategory").value].text;
				});
				ShowExpense(SearchResults);
			}
		}
		
		if(document.getElementById("InputPayment").value != 0) // Filter according to a certain payment method - if one was chosen
		{	
			if(itemChosen == 0) // If table haven't been filterd before
			{
				SearchResults = ExpensesArr.filter(function (el) {
				return 	el.paymentName == document.getElementById("InputPayment").options[document.getElementById("InputPayment").value].text;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}
			else // If table have been filterd before
			{
				SearchResults = SearchResults.filter(function (el) {
				return 	el.paymentName == document.getElementById("InputPayment").options[document.getElementById("InputPayment").value].text;
				});
				ShowExpense(SearchResults);
			}
		}
		if(document.getElementById("InputTransactionSum").value != "") // Filter according to a certain transaction sum - if one was chosen
		{
			if(document.getElementById("InputTransactionSum").value <= 0) // Check if entered sum is bigger then zero
			{
				alert("הכנס סכום עסקה גדול מאפס!");
				return;
			}
			if(itemChosen == 0) // If table haven't been filterd before
			{
				SearchResults = ExpensesArr.filter(function (el) {
				return 	el.transaction == document.getElementById("InputTransactionSum").value;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}
			else // If table have been filterd before
			{
				SearchResults = SearchResults.filter(function (el) {
				return 	el.transaction == document.getElementById("InputTransactionSum").value;
				});
				ShowExpense(SearchResults);
			}
		}
		itemChosen = 0;
	}
	
	function ShowExpense(localExpenseArr){ // Show all expenses added to the application
		$("#ExpensesTable").html('');
		Sum = 0; // Sum of all showen expenses
		if(localExpenseArr == null)
			return;
		var ButtonsArray = ["תאריך", "קטגוריה", "אמצעי תשלום", "סכום עסקה", "הערות"];
		var val = 0;
		var tempArr = [];
		var table = $('<table></table>'); // Create the expense table
		var MyCols = 6;
		
		var row = $('<tr></tr>');
		for(var k = 0; k < 4; k++) // First row - create sorting buttons by date, category, payment method and transaction sum
		{
			var col = $('<td></td>');
			var addDivButton = $('<div id="divExpense"><button id="tableButton'+ k +'" class="tableButtonStyle">'+ ButtonsArray[k] +'</button></div>');
			col.append(addDivButton);
			row.append(col);
		}
		var col = $('<td></td>'); // Add comment column with no button
		var addDivTitle = $('<div id="divExpense4"><label id="commentsTitle" class="commentsTitleStyle">'+ ButtonsArray[4] +'</label></div>');
		col.append(addDivTitle);
		row.append(col);
		table.append(row);
		
		for(var i = 0; i < localExpenseArr.length; i++) // Get info from local storage add insert to table
		{
			tempArr[0] = localExpenseArr[val].date;
			tempArr[1] = localExpenseArr[val].categoryName;
			tempArr[2] = localExpenseArr[val].paymentName;
			tempArr[3] = localExpenseArr[val].transaction;
			tempArr[4] = localExpenseArr[val].comment;
			if(tempArr[4] == undefined || tempArr[4] == "") // If the comments is empty show nothing
				tempArr[4] = " ";
			var Sum = Sum + Number(localExpenseArr[val].transaction); // Sum up all expenses
			tempArr[0] = formattedDate(tempArr[0]); // Show date in the correct way
			
			var row = $('<tr id="row' + val + '"></tr>');
			for(var j = 0; j < MyCols - 1; j++) // Add an expenses to the table
			{
				var col = $('<td></td>');
				var addDiv = $('<div id="divExpense' + val + "_" + j + '" class="divExpenseStyle">'+ tempArr[j] +'</div>');
				col.append(addDiv);
				row.append(col);
			}
			table.append(row);
			val++;
			tempArr = [];
		}
		if(localExpenseArr.length == 0) // If there are no results after filtering, show - "no results found"
		{
			var row = $('<tr></tr>');
			var col = $('<td></td>');
			var addDiv = $('<div id="divNoResult" class="divNoResultStyle">לא נמצאו תוצאות!</div>');
			col.append(addDiv);
			row.append(col);
			table.append(row);
		}
		var row = $('<tr id="row' + (val + 1) + '"></tr>');
		table.append(row);
		$('#ExpensesTable').append(table);
		showSum(val, Sum);
	}
	
	function formattedDate(date) { // Reformat the date from local storage in the correct way
		var myDate = new Date(date);
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var year = myDate.getFullYear();
		return day + '/' + month + '/' + year;
	}
	
	function showSum(val, Sum){ // Show sum on last table row
		var row = document.getElementById("row" + (val + 1));
		var addsumCaption = row.insertCell(0);
		row.insertCell(1);
		row.insertCell(2);
		var addsum = row.insertCell(3);
		var addlabel1 = document.createElement("label"); // Create label for "sums:" caption
		addlabel1.setAttribute("id", "ExpenseSumCaption");
		addlabel1.setAttribute("class", "ExpenseSumCaptionStyle");
		addlabel1.innerHTML = "סך הכל הוצאות:";
		addsumCaption.appendChild(addlabel1);
		var addlabel2 = document.createElement("label"); // Create label that show the sum up of all expenses
		addlabel2.setAttribute("id", "ExpenseSum");
		addlabel2.setAttribute("class", "ExpenseSumStyle");
		addlabel2.innerHTML = Sum.toFixed(2);
		addsum.appendChild(addlabel2);
	}
		
	function ClearChoices(){ // Clear all filters by button click
		itemChosen = 0;
		$("#ExpensesTable").html('');
		document.getElementById("InputDateStart").value = ""; // clear start date
		document.getElementById("InputDateEnd").value = ""; // clear end date
		document.getElementById("InputCategory").value = "0"; // clear category choice
		document.getElementById("InputPayment").value = "0"; // clear payment choice
		document.getElementById("InputTransactionSum").value = ""; // clear transaction
		ShowExpense(ExpensesArr);
	}
	
	$("document").ready(function() {
		CategoryPopulate();
		PaymentPopulate();
		ShowExpense(ExpensesArr);
		
		$("#Filter").click(function(){ // Filter the expenses
			Filter();
		});
		
		$("#Clean").click(function(){ // Clear chosen filters and show all expenses
			ClearChoices();
		});
		
		$(document).on("click", "#tableButton0", function(){ // Sort by date button
			DateSort();
		});
		
		$(document).on("click", "#tableButton1", function(){ // Sort by category button
			CategorySort();
		});
		
		$(document).on("click", "#tableButton2", function(){ // Sort by payment method button
			PaymentSort();
		});
		
		$(document).on("click", "#tableButton3", function(){ // Sort by transaction button
			TransactionSort();
		});
				
	});	
	
}());



