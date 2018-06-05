/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	var sortCategory = 0; // Sorting category ascending/descending variable
	var sortPayment = 0; // Sorting payment method ascending/descending variable
	var SearchResults = []; // Show results array
	var tableExist = 0; // while sorting don't alter data from local storage
	var name;
	
	function CategorySort(){ // Sorting categories ascending/descending
		tableExist = 1;
		name = "Category";
		if(sortCategory == 0)
		{
			SearchResults = SearchResults.sort(function(a, b){  // Sorting categories ascending 
				if(a > b) 
					return -1
				else if (a < b)
					return 1 
				else  
					return 0
			});
			ShowCategoryPayment(); // Show table result after sorting
			sortCategory = 1;
		}
		else if(sortCategory == 1)
		{
			
			SearchResults = SearchResults.sort(function(a, b){ // Sorting categories descending 
				if(a > b) 
					return 1
				else if (a < b)
					return -1 
				else  
					return 0
			});
			ShowCategoryPayment(); // Show table result after sorting
			sortCategory = 0;
		}
		tableExist = 0;
	}
	
	function PaymentSort(){ // Sorting payment methods ascending/descending
		tableExist = 1;
		name = "Payment";
		if(sortPayment == 0)
		{
			SearchResults.sort(function(a, b){ // Sorting payment methods ascending
				if(a > b) 
					return -1
				else if (a < b)
					return 1 
				else  
					return 0
			});
			ShowCategoryPayment(); // Show table result after sorting
			sortPayment = 1;
		}
		else if(sortPayment == 1)
		{
			SearchResults.sort(function(a, b){ // Sorting payment methods descending
				if(a > b) 
					return 1
				else if (a < b)
					return -1 
				else  
					return 0
			});
			ShowCategoryPayment(); // Show table result after sorting
			sortPayment = 0;
		}
		tableExist = 0;
	}
	
	function EditName(id){ // Edit a certain category or payment method in the table
		var i = id.replace( /^\D+/g, '');
		var row =  document.getElementById("row" + i);
		var add = row.insertCell(2);
		
		var addinput = document.createElement("input"); // Create a input textbox for changing the name of the category or payment method
		var inputID = "input" + i;
		addinput.setAttribute("id", "input" + i);
		addinput.setAttribute("class", "inputStyle");
		add.appendChild(addinput);
		
		var addbutton1 = document.createElement("button"); // Create a save button to save textbox value for changing 
		addbutton1.setAttribute("id", "buttonSave");	   // the category or payment method currently in the table
		addbutton1.setAttribute("name", "Save" + i);
		addbutton1.innerHTML = "שמור";
		addbutton1.setAttribute("class", "buttonSaveStyle");
		add.appendChild(addbutton1);
				
		var addbutton2 = document.createElement("button"); // Create a delete button to delete the specific category or payment method
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
		disableButtons();	// Disable all buttons while editing the table besides the - save, delete and abort buttons and the textbox
	}
		
	function Save(MyName){ // Save the new category or payment method written in the textbox
		var type;
		if(document.getElementById("Category").checked) // Check which radio button is choosen to get the right data from local storage
		{
			SearchResults = JSON.parse(localStorage.getItem("Category"));
			type = "Category";
		}
		else if(document.getElementById("Payment").checked)
		{
			SearchResults = JSON.parse(localStorage.getItem("Payment"));
			type = "Payment";
		}
		var placeInResult = MyName.replace( /^\D+/g, ''); // Get the place inside the table result showen on screen
		var inputID = "input" + placeInResult; // Get the id of the textbox in the row that the change button was pressed on
		input = document.getElementById(inputID).value; // Get the textbox value
		if(input == "") 
		{
			alert("לא הוזן ערך חדש!");
			return;
		}
		for(var i = 0; i < SearchResults.length; i++) // Check if the current category or payment method already exist
		{
			if(input == SearchResults[i])
			{
				if(type == "Category")
					alert("הקטגוריה הנוכחית כבר קיימת!");
				else if(type == "Payment")
					alert("אמצעי התשלום הנוכחי כבר קיים!");
				return;
			}
		}
		SearchResults.splice(placeInResult, 1, input); // Remove old category or payment method and add the new one instead
		localStorage.setItem(type, JSON.stringify(SearchResults)); // Save changes local storage
		ShowCategoryPayment(); // Show table after saving
		Abort(MyName); // Go Back to not editing mode
		ShowCategoryPayment(); // Show table after goign into not editing mode (regular mod)
	}
	
	function Delete(MyName){ // Delete the category or payment method in the current row
		var type;
		if(document.getElementById("Category").checked) // Check which radio button is choosen to get the right data from local storage
		{
			SearchResults = JSON.parse(localStorage.getItem("Category"));
			type = "Category";
		}
		else if(document.getElementById("Payment").checked)
		{
			SearchResults = JSON.parse(localStorage.getItem("Payment"));
			type = "Payment";
		}
		var placeInResult = MyName.replace( /^\D+/g, ''); // Get the place inside the table result showen on screen
		SearchResults.splice(placeInResult,1); // Remove the category or payment method
		localStorage.setItem(type, JSON.stringify(SearchResults)); // Save changes local storage
		ShowCategoryPayment(); // Show table after deleting
		Abort(MyName); // Go Back to not editing mode
		ShowCategoryPayment(); // Show table after goign into not editing mode (regular mod)
	}
	
	function Abort(MyName){ // Abort editing and clear buttons and input textbox from screen
		var Abort = document.getElementsByName(MyName); // Get the row number of where the buttons are
		var i = MyName.replace( /^\D+/g, ''); 
		// Get the buttons and textbox id
		var saveName = "Save" + i;
		var deleteName = "Delete" + i;
		var inputID = "input" + i;
		var Save = document.getElementsByName(saveName); 
		var Delete = document.getElementsByName(deleteName);
		var Input = document.getElementById(inputID);
		// Delete the buttons and textbox from screen
		$(Save).remove();
		$(Delete).remove();
		$(Abort).remove();
		$(Input).remove();
		enableButtons(); // Eanble all buttons
	}
				
	function ShowCategoryPayment(){ // Show category/payment method table
	
		$("#CategoryPaymentTableResults").html(''); // Clear table
		if(tableExist == 0) // Check if table already exist - avoid altering local storage
		{
			if(document.getElementById("Category").checked)
			{
				SearchResults = JSON.parse(localStorage.getItem("Category"));
				name = "Category";
			}
			else if(document.getElementById("Payment").checked)
			{
				SearchResults = JSON.parse(localStorage.getItem("Payment"));
				name = "Payment";
			}
		
			if(SearchResults == null)
			{
				alert("אין פריטים בקטגוריה זו!");
				return;
			}
		}
					
		var val = 0;
		var tempArr = [];
		var table = $('<table></table>'); 
		var MyCols = 2;
		var row1 = $('<tr></tr>');
		var col1 = $('<td></td>');
		// Add a sorting button ascending/descending
		var addDivButton1 = $('<div id="div' + name + '"><button id="' + name + 'Button" class="ButtonStyle">'+ name +'</button></div>');
		col1.append(addDivButton1);
		row1.append(col1);
		
		table.append(row1);		
		for(var i = 0; i < SearchResults.length; i++)
		{
			var row1 = $('<tr id="row' + val + '"></tr>');
			var col1 = $('<td></td>');
			// Add rows from local storage
			var addDiv1 = $('<div id="divSearchResult' + val + '" class="divSearchResultStyle">'+ SearchResults[i] +'</div>');
			col1.append(addDiv1);
			row1.append(col1);
			var col2 = $('<td></td>');
			// Add an edit button on the end of every row
			var addDiv2 = $('<div id="divEdit"><button id="EditButton'+ val +'" class="EditButtonStyle">שינוי</button></div>'); //onClick="EditName(this.id)"
			col2.append(addDiv2);
			row1.append(col2);
			table.append(row1);
			val++;
		}
		$('#CategoryPaymentTableResults').append(table);
	}
	
	function disableButtons(){ // Disable all buttons when editing an item in the table
		document.getElementById("ShowCategoryPayment").disabled = true;
		document.getElementById("BackButton").disabled = true;
		var hlink = document.getElementById("BackLink"); 
		hlink.disabled = true;
		hlink.href = "#";
		document.getElementById("Category").disabled = true;
		document.getElementById("Payment").disabled = true;
		var numOfButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = true;
		}
		if(document.getElementById("Category").checked)
			document.getElementById("CategoryButton").disabled = true;
		else if(document.getElementById("Payment").checked)
			document.getElementById("PaymentButton").disabled = true;
	}
	
	function enableButtons(){ // Enable all buttons when finishing editing an item in the table
		document.getElementById("ShowCategoryPayment").disabled = false;
		document.getElementById("BackButton").disabled = false;
		var hlink = document.getElementById("BackLink");
		hlink.disabled = false;
		hlink.href = "javascript:history.back()";
		document.getElementById("Category").disabled = false;
		document.getElementById("Payment").disabled = false;
		var numOfButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = false;
		}
		if(document.getElementById("Category").checked)
			document.getElementById("CategoryButton").disabled = false;
		else if(document.getElementById("Payment").checked)
			document.getElementById("PaymentButton").disabled = false;
	}
	
		
	$("document").ready(function(){
				
		$("#ShowCategoryPayment").click(function(){ // Show categories/payment methods table
			ShowCategoryPayment();
		});
		
		$(document).on("click", "#CategoryButton", function(){ // Category sort button
			CategorySort();
		});
		
		$(document).on("click", "#PaymentButton", function(){ // Payment method sort button
			PaymentSort();
		});
		
		$(document).on("click", "#divEdit", function(){ // Edit category/payment-method button
			var id = $(this).children("button").attr("id"); // Get the number of the row where the "change" button was pressed
			EditName(id);
		});
	
		$(document).on("click", "#buttonSave", function(){ // Save category/payment-method button
			var MyName = $(this).attr("name"); // Get the number of the row where the "change" button was pressed
			Save(MyName);
		});
		
		$(document).on("click", "#buttonDelete", function(){ // Delete category/payment-method button
			var MyName = $(this).attr("name"); // Get the number of the row where the "change" button was pressed
			Delete(MyName);
		});
		
		$(document).on("click", "#buttonAbort", function(){ // Abort editing category/payment-method button
			var MyName = $(this).attr("name"); // Get the number of the row where the "change" button was pressed
			Abort(MyName);
		});
		
		$(document).on("click", "#Category", function(){ // Clear table when clicking on the other radio button
			$("#CategoryPaymentTableResults").html('');
		});
	
		$(document).on("click", "#Payment", function(){ // Clear table when clicking on the other radio button
			$("#CategoryPaymentTableResults").html('');
		});
			
	});	
	
}());



