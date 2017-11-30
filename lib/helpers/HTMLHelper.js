const $ = require('jquery')

module.exports = class HTMLHelper{

  static newTableDiv(data){
    return`
      <div class='${data.name} 'meals-table>
      <tr>
        <table class='${data.name}-table meal-table'>
          <thead>
            <p class='meal-table-title'><strong>${data.name}</strong></p>
              <tr>
                <th class='meal-table-header'>Name</th>
                <th class='meal-table-header'>Calories</th>
                <th class=table-actions></th>
              </tr>
            </thead class='${data.name}-thead meal-table-head'>
          <tbody class='${data.name}-tbody ${data.id} meal-table-body'>
          </tbody>
          <tfoot class='${data.name}-tfoot meal-table-footer'
          </tfoot>
        </table>
      </tr>
    `
  }
}
