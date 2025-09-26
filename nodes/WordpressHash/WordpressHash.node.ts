import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

// Import the wordpress-hash-node library
// It exposes two functions: HashPassword and CheckPassword
// See: https://github.com/AlexAlbala/wordpress-hash-node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hasher = require('wordpress-hash-node');

export class WordpressHash implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'WordPress Hash',
    name: 'wordpressHash',
    // icon intentionally omitted to avoid requiring asset copying during build
    group: ['transform'],
    version: 1,
    description: 'Hash and verify passwords using WordPress-compatible hashing',
    defaults: {
      name: 'WordPress Hash',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Hash Password',
            value: 'hashPassword',
            description: 'Generate a WordPress-compatible hash for a password',
            action: 'Hash password',
          },
          {
            name: 'Check Password',
            value: 'checkPassword',
            description: 'Verify a password against a WordPress-compatible hash',
            action: 'Check password',
          },
        ],
        default: 'hashPassword',
      },

      // Fields for hashPassword
      {
        displayName: 'Password',
        name: 'password',
        type: 'string',
        typeOptions: {
          password: true,
        },
        default: '',
        placeholder: 'enter password',
        description: 'The plain text password to hash',
        displayOptions: {
          show: {
            operation: ['hashPassword'],
          },
        },
      },

      // Fields for checkPassword
      {
        displayName: 'Password',
        name: 'password',
        type: 'string',
        typeOptions: {
          password: true,
        },
        default: '',
        placeholder: 'enter password',
        description: 'The plain text password to check',
        displayOptions: {
          show: {
            operation: ['checkPassword'],
          },
        },
      },
      {
        displayName: 'Hash',
        name: 'hash',
        type: 'string',
        default: '',
        placeholder: '$P$B....',
        description: 'The WordPress-compatible hash to compare against',
        displayOptions: {
          show: {
            operation: ['checkPassword'],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const operation = this.getNodeParameter('operation', 0) as 'hashPassword' | 'checkPassword';

    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === 'hashPassword') {
          const password = this.getNodeParameter('password', i) as string;
          const hash = hasher.HashPassword(password);

          const json: IDataObject = {
            hash,
          };

          returnData.push({ json });
        } else if (operation === 'checkPassword') {
          const password = this.getNodeParameter('password', i) as string;
          const hash = this.getNodeParameter('hash', i) as string;
          const verified = hasher.CheckPassword(password, hash) as boolean;

          const json: IDataObject = {
            verified,
          };

          returnData.push({ json });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
