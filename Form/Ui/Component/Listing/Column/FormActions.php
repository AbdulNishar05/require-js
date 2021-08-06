<?php
namespace My\Form\Ui\Component\Listing\Column;

use Magento\Framework\UrlInterface;
use Magento\Framework\View\Element\UiComponent\ContextInterface;
use Magento\Framework\View\Element\UiComponentFactory;
use Magento\Ui\Component\Listing\Columns\Column;

class FormActions extends Column
{
    protected $url;
    /**
     * @param ContextInterface $context
     * @param UrlInterface $urlInterface
     * @param UiComponentFactory $uiComponentFactory
     * @param array $components
     * @param array $data
     */
    public function __construct(ContextInterface $context, UrlInterface $urlInterface, UiComponentFactory $uiComponentFactory, array $components = [], array $data = [])
    {
        $this->url = $urlInterface;
        parent::__construct($context, $uiComponentFactory, $components, $data);
    }
    /**
     * @param array $dataSource
     * @return array
     */
    public function prepareDataSource(array $dataSource)
    {
        if (isset($dataSource['data']['items'])) {
        foreach ($dataSource['data']['items'] as &$item) {
                 $item[$this->getData('name')]['view'] = ['href' => $this->url->getUrl('form/form/edit', ['id' => $item['id']]),
                    'label' => __('View'),
                    'hidden' => false
                ];
                $item[$this->getData('name')]['delete'] = ['href' => $this->url->getUrl('form/form/deleteaction', ['id' => $item['id']]),
                    'label' => __('Delete'),
                    'hidden' => false
                ];
            }
            return $dataSource;
        }
    }
}
