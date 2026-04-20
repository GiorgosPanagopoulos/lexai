import os
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from backend.config import settings

_vectorstore: Chroma | None = None
_embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

COLLECTION_NAME = "legal_docs"


def _get_vectorstore() -> Chroma:
    global _vectorstore
    if _vectorstore is None:
        _vectorstore = Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=_embeddings,
            persist_directory=settings.CHROMA_PATH,
        )
    return _vectorstore


def ingest_documents(path: str) -> None:
    documents = []
    for filename in os.listdir(path):
        if filename.endswith(".txt"):
            loader = TextLoader(os.path.join(path, filename), encoding="utf-8")
            documents.extend(loader.load())

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(documents)

    vectorstore = _get_vectorstore()
    vectorstore.add_documents(chunks)


def retrieve(query: str, k: int = 3) -> list[str]:
    vectorstore = _get_vectorstore()
    results = vectorstore.similarity_search(query, k=k)
    return [doc.page_content for doc in results]


def is_collection_populated() -> bool:
    try:
        vectorstore = _get_vectorstore()
        count = vectorstore._collection.count()
        return count > 0
    except Exception:
        return False
