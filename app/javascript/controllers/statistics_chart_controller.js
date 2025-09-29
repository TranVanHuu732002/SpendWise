import { Controller } from "@hotwired/stimulus"
import Chart from "chart.js/auto"

export default class extends Controller {
  static targets = ["canvas", "select"]

  connect() {
    this.initializeChart()

    if (this.hasSelectTarget) {
      this.selectTarget.addEventListener("change", (event) => this.changeType(event))
    }

    document.addEventListener("turbo:load", () => {
      this.initializeChart()
    })
  }

  initializeChart() {
    if (this.hasCanvasTarget) {
      if (!this.canvasTarget.getAttribute("data-statistics-chart-labels")) {
        this.canvasTarget.setAttribute("data-statistics-chart-labels", this.element.getAttribute("data-statistics-chart-labels"));
      }
      if (!this.canvasTarget.getAttribute("data-statistics-chart-data")) {
        this.canvasTarget.setAttribute("data-statistics-chart-data", this.element.getAttribute("data-statistics-chart-data"));
      }
      if (!this.canvasTarget.getAttribute("data-statistics-chart-type")) {
        this.canvasTarget.setAttribute("data-statistics-chart-type", "bar");
      }
      this.renderChart();
    } else {
      console.warn("Canvas target is missing. Chart cannot be initialized.");
    }
  }

  renderChart() {
  // Lấy dữ liệu từ thuộc tính trên canvas (đã được cập nhật khi đổi loại)
  const labels = this.canvasTarget.getAttribute("data-statistics-chart-labels")
  const data = this.canvasTarget.getAttribute("data-statistics-chart-data")


    try {
      JSON.parse(labels)
      JSON.parse(data)
    } catch (error) {
      // Bỏ qua lỗi parse
    }

    if (!labels || !data) {
      return
    }

    if (this.chart) {
      this.chart.destroy()
    }

    const ctx = this.canvasTarget.getContext("2d")
    const chartType = this.canvasTarget.getAttribute("data-statistics-chart-type") || "bar"

    // Xác định label phù hợp
    let datasetLabel = "Số tiền (₫)";
    const currentType = this.canvasTarget.getAttribute("data-statistics-chart-type") || "bar";
    if (currentType === "bar") {
      datasetLabel = "Số tiền";
    } else {
      datasetLabel = "Số tiền";
    }

    this.chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: JSON.parse(labels),
        datasets: [{
          label: datasetLabel,
          data: JSON.parse(data),
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
    const value = event.target.value;
    const chartType = "bar"; // Luôn là bar chart

    if (value === "month") {
      this.canvasTarget.setAttribute("data-statistics-chart-labels", this.element.getAttribute("data-statistics-chart-labels"));
      this.canvasTarget.setAttribute("data-statistics-chart-data", this.element.getAttribute("data-statistics-chart-data"));
    } else {
      this.canvasTarget.setAttribute("data-statistics-chart-labels", this.element.getAttribute("data-statistics-chart-year-labels"));
      this.canvasTarget.setAttribute("data-statistics-chart-data", this.element.getAttribute("data-statistics-chart-year-data"));
    }

    this.canvasTarget.setAttribute("data-statistics-chart-type", chartType);
    this.renderChart();
  }
}
