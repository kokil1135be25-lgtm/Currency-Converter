import { useState } from 'react'
import './App.css'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/5412081/pexels-photo-5412081.jpeg')`,
      }}
    >
      <div className="w-full">

        <div
          className="
            w-full max-w-md mx-auto
            rounded-2xl
            p-7
            bg-white/25
            backdrop-blur-md
            border border-white/40
            shadow-2xl
          "
        >

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-white">
              Currency Converter
            </h1>

            <p className="text-white/70 text-sm mt-2">
              Convert currencies quickly and easily
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >

            {/* From */}
            <div className="w-full mb-3">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
              />
            </div>

            {/* Swap */}
            <div className="relative w-full h-6">

              <button
                type="button"
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  border-2
                  border-white
                  rounded-full
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  text-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  shadow-lg
                "
                onClick={swap}
              >
                ⇅ Swap
              </button>

            </div>

            {/* To */}
            <div className="w-full mt-3 mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>

            {/* Convert Button */}
            <button
              type="submit"
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                active:scale-[0.98]
                transition
                text-white
                font-semibold
                px-4
                py-3
                rounded-xl
                shadow-lg
              "
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}

export default App