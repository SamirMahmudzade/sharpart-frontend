import { useState } from 'react';
import { ethers } from 'ethers'


//? React Hook for using ethers bytes functions + more.

export const useEthersBytes = () => {
      const [ethersBytes, setEthersBytes] = useState({
            stringed: '',
            hexed: ''
      })
      const handleChange = (e) => {
            //* Set formatting input on change of text box
            //* Cannot use square brackets, as the target depends on ethers util.

            if (e.target.name === 'hexed') {
                  setEthersBytes({ ...ethersBytes, hexed: ethers.utils.formatBytes32String(e.target.value) })
            }
            else if (e.target.name === 'stringed') {
                  setEthersBytes({ ...ethersBytes, stringed: ethers.utils.toUtf8String(e.target.value) });

            }
      }

      return { ethersBytes, handleChange }
}