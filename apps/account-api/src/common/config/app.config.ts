import convict from 'convict'
import dotenv from 'dotenv'

const schema = {
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'erc4337-api',
    },
    port: {
      doc: 'App port',
      format: Number,
      default: 3000,
    },
  },
  provider: {
    rpcUrl: {
      doc: 'Provider RPC URL',
      format: String,
      default: 'http://localhost:8545',
      env: 'RPC_URL',
    },
    bundlerUrl: {
      doc: 'Bundler URL',
      format: String,
      default: '',
      env: 'BUNDLER_URL',
    },
    entrypoint: {
      doc: 'Entrypoint contract address',
      format: String,
      default: '0x0576a174D229E3cFA37253523E645A78A0C91B57',
      env: 'ENTRYPOINT',
    },
    chainId: {
      doc: 'Chain network Id',
      format: Number,
      default: 1,
      env: 'CHAIN_ID',
    },
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
}

dotenv.config()
const config = convict(schema)
type Config = Record<keyof typeof schema, any>
config.validate({ allowed: 'strict' })
export { config, Config }
