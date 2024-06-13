//
//  ContentView.swift
//  CurrencyExchange
//
//  Created by RPS on 12/06/24.
//

import SwiftUI

struct ExchangeRate: Codable {
    let currency: String
    let rate: Double
}


class CurrencyViewModel: ObservableObject {
    @Published var exchangeRates: [ExchangeRate] = []
    
    init() {
        fetchExchangeRates()
    }
    func fetchExchangeRates() {
        guard let url = URL(string: "https://exchangecurrency-c819.onrender.com/exchange-rates") else {
            print("Invalid API URL")
            return
        }
        
        URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                print("Error fetching data:", error.localizedDescription)
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
                print("Invalid HTTP response")
                return
            }
            
            guard let data = data else {
                print("No data received from the server")
                return
            }
            
            do {
                let decodedData = try JSONDecoder().decode([ExchangeRate].self, from: data)
                self.exchangeRates = decodedData
            } catch {
                print("Error decoding JSON:", error)
                print("Received JSON data:", String(data: data, encoding: .utf8) ?? "Invalid JSON")
            }
        }.resume()
    }

}

struct ContentView: View {
    @ObservedObject var viewModel = CurrencyViewModel()
    
    var body: some View {
        NavigationView {
            List(viewModel.exchangeRates, id: \.currency) { rate in
                VStack(alignment: .leading) {
                    Text(rate.currency)
                        .font(.headline)
                    Text("Rate: \(rate.rate, specifier: "%.2f")")
                        .foregroundColor(.secondary)
                        .preferredColorScheme(.dark)
                }
            }
            .navigationBarTitle("Exchange Rates")
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
