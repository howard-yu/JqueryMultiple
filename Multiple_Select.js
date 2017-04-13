var Multiple_Select = (function () {
	var instance;

	function createInstance() {
		var object = new Multiple();
		return object;
	}

	return {
		getInstance: function () {
				if (!instance) {
						instance = createInstance();
				}
				return instance;
		}      
	};
})();

function Multiple() {
	this.setJson = []; 
}

Multiple.prototype.setContentId = function(id) {
	this.contentid = id;
}
Multiple.prototype.setOptionJson = function(setJson) {
	this.setJson = setJson;
}


Multiple.prototype.createMultipleSelectTable = function(objSubmit,objCencel) {

	var table = $('<table></table>').addClass('table').attr({
		width: '500',
		align: 'center',
		border: '1',
		cellpadding: '0',
		cellspacing: '0'
	});

	var firstFloorTr = $('<tr></tr>');
    var secondFloorTr = $('<tr></tr>');
    var thirdFloorTr = $('<tr></tr>');

	var firstFloorTd1 = $('<th></th>').attr({
		align: 'center',
		width: '150'
	});
	var firstFloorTd2 = $('<th></th>').attr({
		align: 'center',
		width: '200'
	});
	var firstFloorTd3 = $('<th></th>').attr({
		align: 'center',
		width: '150'
	});
    firstFloorTd1.html('Unselect');
    firstFloorTd3.html('Select');

    var secondFloorTd1 = $('<td></td>').attr({
		align: 'center',
		width: '150'
	});
	var secondFloorTd2 = $('<td></td>').attr({
		align: 'center',
		width: '200'
	});
	var secondFloorTd3 = $('<td></td>').attr({
		align: 'center',
		width: '150'
	});

	var thirdFloorTd1 = $('<td></td>').attr({
	    style:'text-align:center',
		colspan: '3',
		rowspan: '3'
	});

	var select1 = $('<select></select>').attr({
	    class: 'form-control',
		multiple: 'multiple',
		id: 'select1'
	});
	var select2 = $('<select></select>').attr({
	    class: 'form-control',
		multiple: 'multiple',
		id: 'select2'
	});

	var spanAddAll = $('<span></span>').attr({
		id: 'add_all'
	});
	var spanAdd = $('<span></span>').attr({
		id: 'add'
	});
	var spanRemoveAll = $('<span></span>').attr({
		id: 'remove_all'
	});
	var spanRemove = $('<span></span>').attr({
		id: 'remove'
	});
	var spanSubmit = $('<span></span>').attr({
	    style:'float:initial',
		id: 'Submit'
	});
	var spanCancel = $('<span></span>').attr({
	    class: 'text-center',
		id: 'Cancel'
	});
	spanAddAll.after('<br />');
	spanAdd.after('<br />');
	spanRemove.after('<br />');

	var btnAddAll = $('<input />').attr({
		type: 'button',
		class: 'btn btn-default center-block btn-md func-button',
		value: '>>'
	});
	var btnAdd = $('<input />').attr({
		type: 'button',
		class: 'btn btn-default center-block btn-md func-button',
		value: '>'
	});
	var btnRemoveAll = $('<input />').attr({
		type: 'button',
		class: 'btn btn-default center-block btn-md func-button',
		value: '<<'
	});
	var btnRemove = $('<input />').attr({
		type: 'button',
		class: 'btn btn-default center-block btn-md func-button',
		value: '<'
	});
	var btnSubmit = $('<input />').attr({
		id: 'btnSubmit',
		type: 'button',
		class: 'btn btn-default btn-md func-button',
		value: 'Submit'
	});
	var btnCancel = $('<input />').attr({
		id: 'btnCancel',
		type: 'button',
		class: 'btn btn-default btn-md func-button',
		value: 'Cancel',
		'data-dismiss': 'modal'
	});

	table.append(firstFloorTr.append(firstFloorTd1).append(firstFloorTd2).append(firstFloorTd3)).append(secondFloorTr.append(secondFloorTd1.append(select1)).append(secondFloorTd2.append(spanAddAll.append(btnAddAll)).append(spanAdd.append(btnAdd)).append(spanRemove.append(btnRemove)).append(spanRemoveAll.append(btnRemoveAll))).append(secondFloorTd3.append(select2))).append(thirdFloorTr.append(thirdFloorTd1.append(spanSubmit.append(btnSubmit)).append(spanCancel.append(btnCancel))));

	$('#appenHtml').append(table);

	$('#select1').empty();

	var jasonResult =  this.setJson == null ? "" : this.setJson;
	$.each(jasonResult, function (index, object) {
	    if (typeof (object.text) == 'undefined') {
	        $('#select1').append($('<option>').text(object).attr('value', object));
		}else{
	        $('#select1').append($('<option>').text(object.text).attr('value', object.val));
		}
	});

 //移到右邊
	$('#add').click(function() {
	//獲取選中的選項，刪除並追加給對方
			$('#select1 option:selected').appendTo('#select2');
	});
	//移到左邊
	$('#remove').click(function() {
			$('#select2 option:selected').appendTo('#select1');
	});
	//全部移到右邊
	$('#add_all').click(function() {
			//獲取選中的選項，刪除並追加給對方
			$('#select1 option').appendTo('#select2');
	});
	//全部移到左邊
	$('#remove_all').click(function() {
			$('#select2 option').appendTo('#select1');
	});
	//雙擊選項
	$('#select1').dblclick(function(){ //綁定雙擊事件
			//獲取選中的選項，刪除並追加給對方
			$("option:selected",this).appendTo('#select2'); //追加給對方
	});
	//雙擊選項
	$('#select2').dblclick(function(){
		 $("option:selected",this).appendTo('#select1');
	});
	$("#btnSubmit").click(function () {
	    var optionValue = [];
		$('#select2 option').each(function(){
				optionValue.push({text:$(this).text(), val: $(this).val()});
		});
		return objSubmit(optionValue);
	});
	$('#btnCancel').click(function () {
	    return objCencel(true);
	});
}

