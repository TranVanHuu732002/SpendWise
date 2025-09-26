import { Controller } from "@hotwired/stimulus"
import Chart from "chart.js/auto"

export default class extends Controller {
  static targets = ["canvas", "select"]

  connect() {
    this.initializeChart()

    if (this.hasSelectTarget) {
      this.selectTarget.addEventListener("change", (event) => this.changeType(event))
    }

    document.addEventListener("turbo:frame-load", () => {
      this.initializeChart()
    })

    document.addEventListener("turbo:load", () => {
      this.initializeChart()
    })
  }

  initializeChart() {
    if (this.hasCanvasTarget) {
      this.renderChart()
    }
  }

  renderChart() {
    if (!this.canvasTarget.hasAttribute("data-statistics-chart-labels") || !this.canvasTarget.hasAttribute("data-statistics-chart-data")) {
      console.warn("Chart data attributes are missing. Skipping chart initialization.")
      return
    }

    if (this.chart) {
      this.chart.destroy()
    }

    const ctx = this.canvasTarget.getContext("2d")
    const labels = JSON.parse(this.canvasTarget.getAttribute("data-statistics-chart-labels"))
    const data = JSON.parse(this.canvasTarget.getAttribute("data-statistics-chart-data"))
    const chartType = this.canvasTarget.getAttribute("data-statistics-chart-type") || "bar"

    this.chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: "Số tiền (₫)",
          data: data,
          backgroundColor: "#3b82f6",
          borderColor: "#2563eb",
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    })
  }

  changeType(event) {
    const value = event.target.value
    if (value === "month") {
      this.canvasTarget.setAttribute("data-statistics-chart-labels", this.element.getAttribute("data-statistics-chart-labels"))
      this.canvasTarget.setAttribute("data-statistics-chart-data", this.element.getAttribute("data-statistics-chart-data"))
      this.canvasTarget.setAttribute("data-statistics-chart-type", "bar")
    } else {
      this.canvasTarget.setAttribute("data-statistics-chart-labels", this.element.getAttribute("data-statistics-chart-year-labels"))
      this.canvasTarget.setAttribute("data-statistics-chart-data", this.element.getAttribute("data-statistics-chart-year-data"))
      this.canvasTarget.setAttribute("data-statistics-chart-type", "bar")
    }
    this.renderChart()
  }
}
