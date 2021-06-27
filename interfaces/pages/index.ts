
export type GasData = {
      safeLow : number
      standard : number
      fast : number
      fastest : number
      blockTime :number
      blockNumber :number
}

export interface EthHistoric {
      market_caps: number[][];
      total_volumes: number[][];
      prices: number[][];
}

export interface HomeProps {
      data: GasData | null
}
export interface EthOrbProps {
      ethHistoric: EthHistoric | null
}