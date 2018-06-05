/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	var ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr"));
	var sortDate = 0; // Sorting date ascending/descending variable
	var sortCategory = 0; // Sorting category ascending/descending variable
	var sortPayment = 0; // Sorting payment method ascending/descending variable
	var sortTransaction = 0; // Sorting transaction ascending/descending variable
	var itemChosen = 0; // If a certain filter has been applied remember that filter when using other filters
		
	if(ExpensesArr == null)
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
			SearchResults.sort(function(a, b){ // Sorting dates ascending
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
			SearchResults.sort(function(a, b){ // Sorting dates descending
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
			SearchResults = SearchResults.sort(function(a, b){ // Sorting categories ascending 
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
			SearchResults = SearchResults.sort(function(a, b){ // Sorting categories descending
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
			SearchResults.sort(function(a, b){ // Sorting payment methods ascending
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
			SearchResults.sort(function(a, b){ // Sorting payment methods descending
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
			SearchResults.sort(function(a, b){ // Sorting transactions ascending
				return a.transaction - b.transaction;
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortTransaction = 1;
		}
		else if(sortTransaction == 1)
		{
			SearchResults.sort(function(a, b){ // Sorting transactions descending
				return b.transaction - a.transaction;				
			});
			ShowExpense(SearchResults); // Show table result after sorting
			sortTransaction = 0;
		}
	}
			
	function Search(){ // Search button - search for expenses according to certain filters
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
	
	function ShowExpense(localExpenseArr){ // Show all expenses according to search results
		$("#ExpensesTableResults").html('');
		
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
		
		for(var i = 0; i < localExpenseArr.length; i++) // Get info from search results add insert to table
		{
			tempArr[0] = localExpenseArr[val].date;
			tempArr[1] = localExpenseArr[val].categoryName;
			tempArr[2] = localExpenseArr[val].paymentName;
			tempArr[3] = localExpenseArr[val].transaction;
			tempArr[4] = localExpenseArr[val].comment;
			if(tempArr[4] == undefined) // If the comments is empty show nothing
				tempArr[4] = "";
			tempArr[0] = formattedDate(tempArr[0]); // Show date in the correct way
			
			var row = $('<tr id="row' + val + '"></tr>');
			for(var j = 0; j < MyCols - 1; j++) // Add an expenses to the table
			{
				var col = $('<td></td>');
				var addDiv = $('<div id="divExpense' + val + "_" + j + '" class="divExpenseStyle">'+ tempArr[j] +'</div>');
				col.append(addDiv);
				row.append(col);
			}
			if(j == MyCols - 1) // Add an edit button on the end of every row
			{
				var col = $('<td></td>');
				var addDiv = $('<div id="divEdit"><button id="EditButton'+ val +'" class="EditButtonStyle">שינוי</button></div>');
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
		$('#ExpensesTableResults').append(table); 
	}
	
	function formattedDate(date) { // Reformat the date from local storage in the correct way
		var myDate = new Date(date);
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var year = myDate.getFullYear();
		return day + '/' + month + '/' + year;
	}
	
	function ClearChoices(){ // Clear all filters by button click
		itemChosen = 0;
		document.getElementById("InputDateStart").value = ""; // clear start date
		document.getElementById("InputDateEnd").value = ""; // clear end date
		document.getElementById("InputCategory").value = "0"; // clear category choice
		document.getElementById("InputPayment").value = "0"; // clear payment choice
		document.getElementById("InputTransactionSum").value = ""; // clear transaction
	}
	
	
	function EditName(id){ // Edit a certain date or category or payment method or transaction sum or comment in the table
		var i = id.replace( /^\D+/g, '');
		var row =  document.getElementById("row" + i);
		var add = row.insertCell(6);
		
		var addinput = document.createElement("input"); // Create a input textbox for changing expense properties
		addinput.setAttribute("id", "input" + i);
		addinput.setAttribute("class", "inputStyle");
		add.appendChild(addinput);
		
		var addselect = document.createElement("select"); // Create a select drop down to choose what to edit/delete
		addselect.setAttribute("id", "selectOption" + i);
		addselect.setAttribute("name", "selectAnOption");
		addselect.options[addselect.options.length] = new Option('בחר', 0);
		addselect.options[addselect.options.length] = new Option('תאריך', 1);
		addselect.options[addselect.options.length] = new Option('קטגוריה', 2);
		addselect.options[addselect.options.length] = new Option('אמצעי תשלום', 3);
		addselect.options[addselect.options.length] = new Option('סכום עסקה', 4);
		addselect.options[addselect.options.length] = new Option('הערות', 5);
		addselect.setAttribute("class", "selectStyle");
		add.appendChild(addselect);
		
		var addbutton1 = document.createElement("button"); // Create a save button to save the textbox value
		addbutton1.setAttribute("id", "buttonSave");
		addbutton1.setAttribute("name", "Save" + i);
		addbutton1.innerHTML = "שמור";
		addbutton1.setAttribute("class", "buttonSaveStyle");
		add.appendChild(addbutton1);
				
		var addbutton2 = document.createElement("button"); // Create a delete button to delete one of the expense properties
		addbutton2.setAttribute("id", "buttonDelete");
		addbutton2.setAttribute("name", "Delete" + i);
		addbutton2.innerHTML = "מחק";
		addbutton2.setAttribute("class", "buttonDeleteStyle");
		add.appendChild(addbutton2);
		
		var addbutton3 = document.createElement("button"); // Create an abort button if you want to cancel the editing
		addbutton3.setAttribute("id", "buttonAbort");
		addbutton3.setAttribute("name", "Abort" + i);
		addbutton3.innerHTML = "בטל";
		addbutton3.setAttribute("class", "buttonAbortStyle");
		add.appendChild(addbutton3);
		disableButtons(); // Disable all buttons while editing the table besides the - save, delete, select and abort buttons and the textbox
	}
		
	function Save(MyName){ // Save the new property written in the textbox
		var placeInExpenseArr;
		var placeInResult = MyName.replace( /^\D+/g, ''); // Get the place inside the table result showen on screen
		ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr")); // Get info from local storage
		var inputID = "input" + placeInResult; // Get the id of the textbox in the row that the change button was pressed on
		input = document.getElementById(inputID).value; // Get the textbox value
		var selectID = "selectOption" + placeInResult;
		selectOption = document.getElementById(selectID).value; // Get the selected property from the drop down
		if(selectOption == 0) // No property was chosen
		{
			alert("לא נבחרה אפשרות שינוי!");
			return;
		}
		if(input == "" && selectOption == 5) // Changing the comment to empty comment
		{
			if(confirm('הוזן ערך ריק האם אתה בטוח שאתה מעוניין להמשיך?') == false)
				return;
		}
		else if(input == "" && selectOption != 5)
		{
			alert("לא הוזן ערך!");
			return;
		}
		
		var ResultName = optionChoice(selectOption); // Get the property according to the select drop down number
		
		if(ResultName == "transaction") // If transaction sum property was chosen, ensure the value is a number bigger then zero
		{
			if(isNaN(input) == false)
			{
				if(input <= 0)
				{
					alert("נא להזין ערך גדול מאפס!");
					return;
				}
			}
			else
			{
				alert("לא הוזן מספר!");
				return;
			}
		}
		
		for(var i = 0; i < ExpensesArr.length; i++) // Find the expense to change in the local storage
		{
			if(SearchResults[placeInResult].number == ExpensesArr[i].number)
			{
				placeInExpenseArr = i;
				break;
			}
		}
		ExpensesArr[placeInExpenseArr][ResultName] = input; // Insert the new change to the local storage array
		localStorage.setItem("ExpensesArr", JSON.stringify(ExpensesArr)); // Save the array in local storage
		SearchResults[placeInResult][ResultName] = input; // Insert the new change to showen results on screen
		ShowExpense(SearchResults); // Reload table results on screen
		Abort(MyName); // Go Back to not editing mode
		ShowExpense(SearchResults); // Show table after goign into not editing mode (regular mod)
		alert("השינוי בוצע!");
	}
	
	function optionChoice(selectOption){ // Choose the property according to the number from the drop down select box
		if(selectOption == 1)
			return "date";
		if(selectOption == 2)
			return "categoryName";
		if(selectOption == 3)
			return "paymentName";
		if(selectOption == 4)
			return "transaction";
		if(selectOption == 5)
			return "comment";
	}
	
	function Delete(MyName){ // Delete the property in the current row
		var placeInExpenseArr;
		ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr"));
		var placeInResult = MyName.replace( /^\D+/g, ''); // Get the place inside the table result showen on screen
		for(var i = 0; i < ExpensesArr.length; i++) // Find the expense to change in the local storage
		{
			if(SearchResults[placeInResult].number == ExpensesArr[i].number)
			{
				placeInExpenseArr = i;
				break;
			}
		}	
		ExpensesArr.splice(placeInExpenseArr,1); // Delete the exepense from local storage
		localStorage.setItem("ExpensesArr", JSON.stringify(ExpensesArr)); // Save the new array in local storage after deleting
		SearchResults.splice(placeInResult, 1); // Delete the exepense from search results showen on screen
		ShowExpense(SearchResults); // Show table after deleting
		Abort(MyName); // Go Back to not editing mode
		ShowExpense(SearchResults); // Show table after goign into not editing mode (regular mod)
	}
	
	function Abort(MyName){ // Abort editing and clear buttons and input textbox from screen
		var Abort = document.getElementsByName(MyName); // Get the row number of where the buttons are
		var i = MyName.replace( /^\D+/g, '');
		// Get the buttons and textbox id
		var saveName = "Save" + i;
		var deleteName = "Delete" + i;
		var inputID = "input" + i;
		var selectID = "selectOption" + i;
		var Save = document.getElementsByName(saveName);
		var Delete = document.getElementsByName(deleteName);
		var Input = document.getElementById(inputID);
		var Select = document.getElementById(selectID);
		// Delete the buttons and textbox from screen
		$(Save).remove();
		$(Delete).remove();
		$(Abort).remove();
		$(Input).remove();
		$(Select).remove();
		enableButtons(); // Eanble all buttons
	}
		
	function disableButtons(){ // Disable all buttons when editing an item in the table
		document.getElementById("InputDateStart").disabled = true;
		document.getElementById("InputDateEnd").disabled = true;
		document.getElementById("InputCategory").disabled = true;
		document.getElementById("InputPayment").disabled = true;
		document.getElementById("InputTransactionSum").disabled = true;
		document.getElementById("Search").disabled = true;
		document.getElementById("Clean").disabled = true;
		document.getElementById("BackButton").disabled = true;
		var hlink = document.getElementById("BackLink"); 
		hlink.disabled = true;
		hlink.href = "#";
		var numOfChangeButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfChangeButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = true;
		}
		var numOfSortButtons = $("#divExpense > button").length;
		for(var j = 0; j < numOfSortButtons; j++)
		{
			document.getElementById("tableButton" + j).disabled = true;
		}
		
	}
	
	function enableButtons(){ // Enable all buttons when finishing editing an item in the table
		document.getElementById("InputDateStart").disabled = false;
		document.getElementById("InputDateEnd").disabled = false;
		document.getElementById("InputCategory").disabled = false;
		document.getElementById("InputPayment").disabled = false;
		document.getElementById("InputTransactionSum").disabled = false;
		document.getElementById("Search").disabled = false;
		document.getElementById("Clean").disabled = false;
		document.getElementById("BackButton").disabled = false;
		var hlink = document.getElementById("BackLink");
		hlink.disabled = false;
		hlink.href = "javascript:history.back()";
		var numOfChangeButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfChangeButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = false;
		}
		var numOfSortButtons = $("#divExpense > button").length;
		for(var j = 0; j < numOfSortButtons; j++)
		{
			document.getElementById("tableButton" + j).disabled = false;
		}
	}
	
	function changeToDate(id){ // When choosing to change the date, the input will change to date input
		var i = id.replace( /^\D+/g, '');
		var inputID = "input" + i;
		document.getElementById(inputID).type = 'date';
	}
	
	function changeToInput(id){ // When choosing to change others besides the date, the input will change to normal text input
		var i = id.replace( /^\D+/g, '');
		var inputID = "input" + i;
		document.getElementById(inputID).type = 'input';
	}
			
	$("document").ready(function() {
		CategoryPopulate();
		PaymentPopulate();
		$("#Search").click(function(){ // Search for expenses
			Search();
		});
		
		$("#Clean").click(function(){ // // Clear chosen filters
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
				
		$(document).on("click", "#divEdit", function(){ // Edit expense properties button
			var id = $(this).children("button").attr("id"); // Get the number of the row where the "change" button was pressed
			EditName(id);
		});
	
		$(document).on("click", "#buttonSave", function(){ // Save expense new property button
			var MyName = $(this).attr("name"); // Get the number of the row where the "change" button was pressed
			Save(MyName);
		});
		
		$(document).on("click", "#buttonDelete", function(){ // Delete current expense button
			var MyName = $(this).attr("name"); // Get the number of the row where the "change" button was pressed
			Delete(MyName);
		});
		
		$(document).on("click", "#buttonAbort", function(){ // Abort editing expense properties button
			var MyName = $(this).attr("name"); // Get the number of the row where the "change" button was pressed
			Abort(MyName);
		});
		
		$(document).on("change", ".selectStyle", function(){ // Choose between date property to other properties for input type change
			var id = $(this).attr("id"); // Get the number of the row where the "change" button was pressed
			if($(this).prop("selectedIndex") == 1)
				changeToDate(id);
			else
				changeToInput(id);
		});
		
	});	
	
}());



