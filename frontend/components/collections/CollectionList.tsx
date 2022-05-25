import CollectionItem from "./CollectionItem";

function CollectionList(props: any) {
  return (
    <ul>
      {props.collections.map((collection: any) => (
        <CollectionItem
          key={collection.id}
          id={collection.id}
          imageUrl={collection.imageUrl}
          description={collection.description}
          name={collection.name}
          chain={collection.chain}
        />
      ))}
    </ul>
  );
}

export default CollectionList;