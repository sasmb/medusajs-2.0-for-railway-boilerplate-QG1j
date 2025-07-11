import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: HttpTypes.StoreCartLineItem[]
}

const ItemsTemplate = ({ items }: ItemsTemplateProps) => {
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem] text-brand-dark font-heading">Cart</Heading>
      </div>
      <Table className="bg-brand-light">
        <Table.Header className="border-t-0 bg-brand-light">
          <Table.Row className="text-brand-dark/80 txt-medium-plus bg-brand-light border-b border-brand-green/20">
            <Table.HeaderCell className="!pl-0 text-brand-dark bg-brand-light font-heading">Item</Table.HeaderCell>
            <Table.HeaderCell className="bg-brand-light"></Table.HeaderCell>
            <Table.HeaderCell className="text-brand-dark bg-brand-light font-heading">Quantity</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell text-brand-dark bg-brand-light font-heading">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right text-brand-dark bg-brand-light font-heading">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="bg-brand-light">
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return <Item key={item.id} item={item} />
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
