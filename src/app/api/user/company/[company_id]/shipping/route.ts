import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import {
  getShippingByCompanyId,
  updateDeliveryInstructions,
} from '@/shared/utils/db/user';
import { NextRequest } from 'next/server';

async function handler(
  req: NextRequest,
  { params }: { params: { company_id: string } }
) {
  try {
    await checkAuthentication();

    const company_id = params.company_id;

    const { deliveryInstructions } = await resolveRequestBody<{
      deliveryInstructions: string;
    }>(req);

    switch (req.method) {
      case 'GET':
        const data = await getShippingByCompanyId({
          company_id,
        });
        return new Response(JSON.stringify(data));

      case 'PUT':
        const updateInstructions = await updateDeliveryInstructions({
          company_id,
          deliveryInstructions,
        });
        return new Response(JSON.stringify(updateInstructions));
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as PUT };
