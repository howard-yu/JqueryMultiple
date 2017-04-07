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
  this.contentid = "";
}

Multiple.prototype.setContentId = function(id) {
  this.contentid = id;
}
Multiple.prototype.SetJson = function(setJson) {
  this.setJson = setJson;
}

Multiple.prototype.CreateMultipleSelectTable = function() {

  var table = $('<table></table>').addClass('newContTab').attr({
    width: '500',
    align: 'center',
    border: '0',
    cellpadding: '0',
    cellspacing: '0'
  });
  var tr = $('<tr></tr>').append('<th>&nbsp;</th>');
  var td = $('<td></td>');
  var div = $('<div></div>');
  var cfirstDiv = $('<div></div>');
  var cSecondDiv = $('<div></div>').attr({
    style: 'float:left'
  });
  var cthirdDiv = $('<div></div>');
  var cfourthDiv = $('<div></div>').attr({
    style: 'width:150px;height:200px; float:left;'
  });
  var cfifthDiv = $('<div></div>').attr({
    style: 'float:left'
  });
  var select = $('<select></select>').attr({
    multiple: 'multiple',
    id: 'select1',
    style: 'width:150px;height:200px; float:left; border:4px #A0A0A4 outset; padding:4px;'
  });
  var select2 = $('<select></select>').attr({
    multiple: 'multiple',
    id: 'select2',
    style: 'width:150px;height:200px; float:left; border:4px #A0A0A4 outset; padding:4px;'
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
    id: 'Submit'
  });

  var btnAddAll = $('<input />').attr({
    type: 'button',
    class: 'btn',
    value: 'Select All'
  });
  var btnAdd = $('<input />').attr({
    type: 'button',
    class: 'btn',
    value: 'Select'
  });
  var btnRemoveAll = $('<input />').attr({
    type: 'button',
    class: 'btn',
    value: 'Remove All'
  });
  var btnRemove = $('<input />').attr({
    type: 'button',
    class: 'btn',
    value: 'Remove'
  });
  var btnSubmit = $('<input />').attr({
    id: 'btnSubmit',
    type: 'button',
    class: 'btn',
    value: 'Submit'
  });

  spanAddAll.after('<br />');
  spanAdd.after('<br />');
  spanRemove.after('<br />');

  table.append(tr.append(td.append(div.append(cfirstDiv.append(select)).append(cSecondDiv.append(spanAddAll.append(btnAddAll)).append(spanAdd.append(btnAdd)).append(spanRemove.append(btnRemove)).append(spanRemoveAll.append(btnRemoveAll))).append(cthirdDiv.append(select2)).append(cfourthDiv).append(cfifthDiv.append(spanSubmit.append(btnSubmit))))));

  $('#appenHtml').append(table);

  $('#select1').empty();

  var jasonResult =  this.setJson == null ? "" : this.setJson;
  $.each(jasonResult, function(i, obj){
    if(obj.text=='undefined'){
      $('#select1').append($('<option>').text(obj.text).attr('value', obj.val));
    }else{
      $('#select1').append($('<option>').text(obj).attr('value', obj));
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
  //回傳選則後JSON格式
  var optionValue = [];
  var id = this.contentid;
  $("#btnSubmit").click(function(){
    $('#select2 option').each(function(){
        optionValue.push({text:$(this).text(), val: $(this).val()});
    });
    var JsonString = JSON.stringify(optionValue);
    $('#' + id).html(JsonString);
  });
}
