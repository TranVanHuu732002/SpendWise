import { Application } from "@hotwired/stimulus"
import StatisticsChartController from "./statistics_chart_controller"
import StatisticsTableController from "./statistics_table_controller"

const application = Application.start()
application.register("statistics-chart", StatisticsChartController)
application.register("statistics-table", StatisticsTableController)
