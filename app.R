library(shiny)

# Define UI for application
ui <- fluidPage(
  titlePanel("My Shiny App"),
  sidebarLayout(
    sidebarPanel(
      sliderInput("obs", "Number of observations:", min = 1, max = 100, value = 50)
    ),
    mainPanel(
      plotOutput("distPlot")
    )
  )
)

# Define server logic
server <- function(input, output) {
  output$distPlot <- renderPlot({
    hist(rnorm(input$obs))
  })
}

# Run the application
shinyApp(ui = ui, server = server)
