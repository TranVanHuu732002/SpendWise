import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["table", "header", "body", "exportType"]

  connect() {
    this.categoryData = JSON.parse(this.element.dataset.statisticsTableCategory)
    this.monthData = JSON.parse(this.element.dataset.statisticsTableMonth)
    this.yearData = JSON.parse(this.element.dataset.statisticsTableYear)
    this.tableHeader = this.element.querySelector("#tableHeader")
    this.tableBody = this.element.querySelector("#tableBody")
    this.exportType = this.element.querySelector("#exportType")

    this.renderTable("category")
  }

  changeType(event) {
    const selectedType = event.target.value
    this.exportType.value = selectedType
    this.renderTable(selectedType)
  }

  renderTable(type) {
    let headerHtml = ""
    let rowsHtml = ""

    if (type === "categories") {
      headerHtml = `<th class='py-2 px-4 border font-semibold text-gray-700'>Danh mục</th><th class='py-2 px-4 border font-semibold text-gray-700'>Số tiền</th>`
      Object.entries(this.categoryData).forEach(([category, amount]) => {
        rowsHtml += `<tr class='hover:bg-gray-50'><td class='py-2 px-4 border text-center'>${category}</td><td class='py-2 px-4 border text-right text-green-600 font-bold'>${this.formatCurrency(amount)}</td></tr>`
      })
    } else if (type === "monthly") {
      headerHtml = `<th class='py-2 px-4 border font-semibold text-gray-700'>Tháng/Năm</th><th class='py-2 px-4 border font-semibold text-gray-700'>Số tiền</th>`
      Object.entries(this.monthData).forEach(([month, amount]) => {
        rowsHtml += `<tr class='hover:bg-gray-50'><td class='py-2 px-4 border text-center'>${month}</td><td class='py-2 px-4 border text-right text-green-600 font-bold'>${this.formatCurrency(amount)}</td></tr>`
      })
    } else if (type === "yearly") {
      headerHtml = `<th class='py-2 px-4 border font-semibold text-gray-700'>Năm</th><th class='py-2 px-4 border font-semibold text-gray-700'>Số tiền</th>`
      Object.entries(this.yearData).forEach(([year, amount]) => {
        rowsHtml += `<tr class='hover:bg-gray-50'><td class='py-2 px-4 border text-center'>${year}</td><td class='py-2 px-4 border text-right text-green-600 font-bold'>${this.formatCurrency(amount)}</td></tr>`
      })
    } else {
      return
    }

    this.tableHeader.innerHTML = headerHtml
    this.tableBody.innerHTML = rowsHtml
  }

  formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })
  }
}